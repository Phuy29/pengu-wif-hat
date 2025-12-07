import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getMint,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import bs58 from "bs58";
import { prisma } from "@/lib/prisma";

// Environment variables
const TREASURY_WALLET_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_WALLET_ADDRESS;
const DISPENSER_WALLET_PRIVATE_KEY = process.env.DISPENSER_WALLET_PRIVATE_KEY;
const NEXT_PUBLIC_PENGU_TOKEN_MINT = process.env.NEXT_PUBLIC_PENGU_TOKEN_MINT;
const RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl("devnet");

// Exchange rate: 1 SOL = 1000 PENGU
const PENGU_PER_SOL = 1000;

export async function POST(req: NextRequest) {
  try {
    const { signature, userAddress } = await req.json();

    if (!signature || !userAddress) {
      return NextResponse.json(
        { error: "Missing signature or userAddress" },
        { status: 400 }
      );
    }

    if (
      !TREASURY_WALLET_ADDRESS ||
      !DISPENSER_WALLET_PRIVATE_KEY ||
      !NEXT_PUBLIC_PENGU_TOKEN_MINT
    ) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const connection = new Connection(RPC_URL, "confirmed");

    // 1. Verify the transaction
    // We wait a bit to ensure the transaction is propagated if we just received the signature
    // But usually the frontend waits for confirmation before calling this.

    const tx = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Ensure the transaction was successful
    if (tx.meta?.err) {
      return NextResponse.json(
        { error: "Transaction failed on-chain" },
        { status: 400 }
      );
    }

    // Check if the transaction transferred SOL to the Treasury Wallet
    const treasuryIndex = tx.transaction.message.accountKeys.findIndex(
      (key) => key.pubkey.toString() === TREASURY_WALLET_ADDRESS
    );

    if (treasuryIndex === -1) {
      return NextResponse.json(
        { error: "Treasury wallet not involved in transaction" },
        { status: 400 }
      );
    }

    const preBalance = tx.meta?.preBalances[treasuryIndex] || 0;
    const postBalance = tx.meta?.postBalances[treasuryIndex] || 0;
    const lamportsReceived = postBalance - preBalance;

    if (lamportsReceived <= 0) {
      return NextResponse.json(
        { error: "No SOL received by treasury" },
        { status: 400 }
      );
    }

    const solAmount = lamportsReceived / LAMPORTS_PER_SOL;
    const penguAmount = solAmount * PENGU_PER_SOL;

    // 2. Dispense PENGU
    let dispenserKeypair: Keypair;
    try {
      // Try decoding as Base58
      dispenserKeypair = Keypair.fromSecretKey(
        bs58.decode(DISPENSER_WALLET_PRIVATE_KEY)
      );
    } catch (e) {
      // Try parsing as JSON array
      try {
        const secretKey = Uint8Array.from(
          JSON.parse(DISPENSER_WALLET_PRIVATE_KEY)
        );
        dispenserKeypair = Keypair.fromSecretKey(secretKey);
      } catch (e2) {
        throw new Error("Invalid DISPENSER_WALLET_PRIVATE_KEY format");
      }
    }

    const mintPublicKey = new PublicKey(NEXT_PUBLIC_PENGU_TOKEN_MINT);
    const userPublicKey = new PublicKey(userAddress);

    // Get Dispenser's Token Account
    const dispenserTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      dispenserKeypair,
      mintPublicKey,
      dispenserKeypair.publicKey
    );

    // Get User's Token Account
    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      dispenserKeypair, // Payer
      mintPublicKey,
      userPublicKey
    );

    const mintInfo = await getMint(connection, mintPublicKey);
    const amountToDispense = BigInt(
      Math.floor(penguAmount * Math.pow(10, mintInfo.decimals))
    );

    const transferIx = createTransferInstruction(
      dispenserTokenAccount.address,
      userTokenAccount.address,
      dispenserKeypair.publicKey,
      amountToDispense
    );

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const dispenseTx = new Transaction({
      blockhash,
      lastValidBlockHeight,
      feePayer: dispenserKeypair.publicKey,
    }).add(transferIx);

    dispenseTx.sign(dispenserKeypair);

    const dispenseSignature = await connection.sendRawTransaction(
      dispenseTx.serialize()
    );
    await connection.confirmTransaction({
      signature: dispenseSignature,
      blockhash,
      lastValidBlockHeight,
    });

    // --- DB RECORDING START ---
    try {
      // 1. Upsert User
      const user = await prisma.user.upsert({
        where: { walletAddress: userAddress },
        update: {},
        create: { walletAddress: userAddress },
      });

      // 2. Create Transaction Record
      await prisma.transaction.create({
        data: {
          userId: user.id,
          amount: solAmount,
          penguAmount: penguAmount,
          type: "BUY",
          signature: signature,
          dispenseSignature: dispenseSignature,
          status: "SUCCESS",
        },
      });
    } catch (dbError) {
      console.error("Database Error:", dbError);
      // We don't fail the request if DB fails, as the transaction is already done.
      // But in production, we should have a queue or retry mechanism.
    }
    // --- DB RECORDING END ---

    return NextResponse.json({
      success: true,
      receivedSol: solAmount,
      sentPengu: penguAmount,
      dispenseSignature,
    });
  } catch (error: any) {
    console.error("Buy API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
