"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Loader2 } from "lucide-react";

export function SwapBox() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [activeTab, setActiveTab] = useState("swap");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    if (!publicKey) return;
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      setStatus("error");
      return;
    }

    const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY_WALLET_ADDRESS;
    if (!treasuryAddress) {
      setMessage("Treasury wallet not configured.");
      setStatus("error");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("Initiating transaction...");

    try {
      const lamports = Number(amount) * LAMPORTS_PER_SOL;
      const treasuryPublicKey = new PublicKey(treasuryAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryPublicKey,
          lamports,
        })
      );

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);

      setMessage("Transaction sent! Waiting for confirmation...");

      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      setMessage("Transaction confirmed! Dispensing PENGU...");

      // Call Backend
      const response = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature, userAddress: publicKey.toString() }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(`Success! You received ${data.sentPengu} PENGU.`);
        setAmount("");
      } else {
        setStatus("error");
        setMessage(`Error: ${data.error}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setMessage(`Failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FFE8D6] border-4 border-black rounded-3xl p-6 shadow-[0_8px_0_rgba(0,0,0,0.2)] text-black max-w-md w-full mx-auto relative">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("swap")}
          className={`flex-1 py-3 rounded-xl font-black text-lg transition-all border-2 ${
            activeTab === "swap"
              ? "bg-[#7DD3FC] border-black text-black shadow-[0_4px_0_rgba(0,0,0,1)] -translate-y-1"
              : "bg-[#E5E5E5] border-transparent text-gray-500 hover:bg-[#D4D4D4]"
          }`}
        >
          Buy $PENGU
        </button>
        <button
          onClick={() => setActiveTab("stake")}
          className={`flex-1 py-3 rounded-xl font-black text-lg transition-all border-2 ${
            activeTab === "stake"
              ? "bg-[#F9A8D4] border-black text-black shadow-[0_4px_0_rgba(0,0,0,1)] -translate-y-1"
              : "bg-[#E5E5E5] border-transparent text-gray-500 hover:bg-[#D4D4D4]"
          }`}
        >
          Stake
        </button>
      </div>

      {activeTab === "swap" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-black text-[#8B4513]">
              You Pay (SOL)
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#D4A373] border-2 border-black rounded-xl px-4 py-3 text-lg font-bold placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <img
                  src="/solana-logo.png"
                  alt="SOL"
                  className="w-5 h-5 rounded-full"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <span className="text-sm font-bold text-white">SOL</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-[#7DD3FC] p-2 rounded-full border-4 border-black shadow-lg">
              <span className="text-xl font-bold text-black">↓</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-[#8B4513]">
              You Receive ($PENGU)
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                readOnly
                value={amount ? (Number(amount) * 1000).toString() : ""}
                className="w-full bg-[#D4A373] border-2 border-black rounded-xl px-4 py-3 text-lg font-bold text-white placeholder-white/70"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <img
                  src="/logo.png"
                  alt="PENGU"
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm font-bold text-white">PENGU</span>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            {!publicKey ? (
              <WalletMultiButton className="!w-full !bg-[#7DD3FC] hover:!bg-[#38BDF8] !text-black !border-2 !border-black !font-black !py-4 !rounded-xl !text-xl !shadow-[0_4px_0_#000] !transform !transition active:!translate-y-1 active:!shadow-none hover:!-translate-y-1 !justify-center" />
            ) : (
              <button
                onClick={handleBuy}
                disabled={isLoading}
                className="w-full bg-[#7DD3FC] hover:bg-[#38BDF8] text-black border-2 border-black font-black py-4 rounded-xl text-xl shadow-[0_4px_0_#000] transform transition active:translate-y-1 active:shadow-none hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "BUY NOW"}
              </button>
            )}

            {message && (
              <div
                className={`p-3 rounded-xl border-2 border-black font-bold text-center text-sm ${
                  status === "success"
                    ? "bg-green-200"
                    : status === "error"
                    ? "bg-red-200"
                    : "bg-yellow-100"
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-xs font-bold text-center mt-3 text-[#8B4513]/80 uppercase tracking-wide">
              ⚡ Instant Buy via Treasury
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-bold text-[#8B4513]">
              Staking Pool Active
            </p>
            <div
              className="text-5xl font-black text-[#F59E0B] drop-shadow-[0_2px_0_rgba(0,0,0,1)]"
              style={{ textShadow: "2px 2px 0px #000" }}
            >
              150% APY
            </div>
          </div>

          <div className="bg-black/5 rounded-xl p-4 border-2 border-black/10">
            <p className="text-sm text-[#8B4513] mb-1 font-bold">
              Total Staked
            </p>
            <p className="text-2xl font-black text-black">12,450,000 PENGU</p>
          </div>

          <p className="text-sm text-[#8B4513] font-medium">
            Stake your PENGU to earn more!
          </p>
          <button className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-black border-2 border-black font-black py-4 rounded-xl shadow-[0_4px_0_#000] transform transition active:translate-y-1 active:shadow-none hover:-translate-y-1">
            Connect Wallet to Stake
          </button>
        </div>
      )}
    </div>
  );
}
