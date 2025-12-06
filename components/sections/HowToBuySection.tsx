import { Wallet, Coins, Rocket } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

export function HowToBuySection() {
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
      description: "Enter the amount of SOL you want to spend and click 'MÚC'.",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
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
      </div>
    </section>
  );
}
