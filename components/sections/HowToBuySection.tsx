"use client";

import { useState } from "react";
import { Wallet, Coins, Rocket, Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export function HowToBuySection() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const steps = [
    {
      id: 1,
      title: "Connect Wallet",
      description:
        "Connect your Solana wallet (Phantom, Solflare) to get started.",
      icon: <Wallet className="w-12 h-12 text-black" />,
      color: "bg-[#A7F3D0]", // Green
      rotate: "-rotate-2",
    },
    {
      id: 2,
      title: "Enter Amount",
      description: "Enter the amount of SOL you want to spend and click 'BUY'.",
      icon: <Coins className="w-12 h-12 text-black" />,
      color: "bg-[#FDE047]", // Yellow
      rotate: "rotate-1",
    },
    {
      id: 3,
      title: "Receive $PENGU",
      description: "Tokens are instantly dispensed to your wallet. No waiting!",
      icon: <Rocket className="w-12 h-12 text-black" />,
      color: "bg-[#F9A8D4]", // Pink
      rotate: "-rotate-1",
    },
  ];

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
    <section
      id="howtobuy"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/5.png"
          alt="HowToBuy Background"
          fill
          priority
          className="object-center"
        />
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 pb-10 px-4 min-h-screen">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 relative"
        >
          <h2
            className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_6px_0_#000] stroke-black"
            style={{ WebkitTextStroke: "3px black" }}
          >
            HOW TO BUY
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative group ${step.rotate}`}
            >
              <div
                className={`absolute inset-0 bg-black rounded-3xl translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3`}
              />
              <div
                className={`relative ${step.color} border-4 border-black rounded-3xl p-8 h-full flex flex-col items-center text-center transition-transform group-hover:-translate-y-1`}
              >
                <div className="bg-white border-4 border-black rounded-full p-4 mb-6 shadow-[4px_4px_0_0_#000]">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  {step.title}
                </h3>
                <p className="text-lg font-bold text-black/80">
                  {step.description}
                </p>

                {/* Step Number Badge */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                  <span className="text-xl font-black text-black">
                    {step.id}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instant Buy Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0_0_#000] relative z-10"
        >
          <h3 className="text-3xl font-black text-black mb-6 text-center uppercase">
            Instant Buy
          </h3>

          {!publicKey ? (
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-[#FDE047] !text-black !font-black !border-2 !border-black !shadow-[4px_4px_0_0_#000] hover:!translate-y-1 hover:!shadow-none transition-all" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-black font-bold mb-2">
                  Amount (SOL)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-100 border-2 border-black rounded-xl p-3 font-bold focus:outline-none focus:ring-2 focus:ring-[#FDE047]"
                  placeholder="0.1"
                />
              </div>

              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span>You receive:</span>
                <span>
                  {amount ? (Number(amount) * 1000).toLocaleString() : 0} PENGU
                </span>
              </div>

              <button
                onClick={handleBuy}
                disabled={isLoading}
                className="w-full bg-[#A7F3D0] text-black font-black text-xl py-4 rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-none active:translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "BUY NOW"}
              </button>

              {message && (
                <div
                  className={`p-3 rounded-xl border-2 border-black font-bold text-center ${
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
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
