"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function TokenomicSection() {
  return (
    <section
      id="tokenomics"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 60 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/6.png"
          alt="Tokenomic Background"
          fill
          priority
          className="object-center"
        />
      </div>

      <div className="relative w-full h-full overflow-hidden min-h-screen">
        {/* Title: TOKENOMICS */}
        {/* Title: TOKENOMICS */}
        <div className="absolute top-[5%] w-full flex justify-center z-30">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2
              className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_6px_0_#000] stroke-black"
              style={{ WebkitTextStroke: "3px black" }}
            >
              TOKENOMICS
            </h2>
          </motion.div>
        </div>

        {/* Ice Pie Chart - Left Side */}
        <motion.div
          className="absolute top-[15%] left-[5%] md:left-[10%] w-[80%] md:w-[40%] z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/tokenomics.png"
              alt="Tokenomics Ice Chart"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-2xl animate-float-slow"
            />

            {/* Tokenomics Data Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Data Points - Positioned relative to the chart */}

              {/* Top Middle - Missing Part */}
              <div className="absolute top-[8%] left-[50%] transform -translate-x-1/2 text-center">
                <p className="text-white font-black text-2xl md:text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
                  10%
                </p>
                <p className="text-[#B3E5FC] font-bold text-sm md:text-xl uppercase tracking-wider">
                  Airdrop
                </p>
              </div>

              {/* Top Right */}
              <div className="absolute top-[20%] right-[12%] text-center transform rotate-12">
                <p className="text-white font-black text-2xl md:text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
                  30%
                </p>
                <p className="text-[#B3E5FC] font-bold text-sm md:text-xl uppercase tracking-wider">
                  Presale
                </p>
              </div>

              {/* Bottom Right */}
              <div className="absolute bottom-[25%] right-[15%] text-center transform -rotate-6">
                <p className="text-white font-black text-2xl md:text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
                  15%
                </p>
                <p className="text-[#B3E5FC] font-bold text-sm md:text-xl uppercase tracking-wider">
                  Marketing
                </p>
              </div>

              {/* Bottom Left */}
              <div className="absolute bottom-[20%] left-[18%] text-center transform rotate-6">
                <p className="text-white font-black text-2xl md:text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
                  5%
                </p>
                <p className="text-[#B3E5FC] font-bold text-sm md:text-xl uppercase tracking-wider">
                  Team
                </p>
              </div>

              {/* Top Left */}
              <div className="absolute top-[25%] left-[12%] text-center transform -rotate-12">
                <p className="text-white font-black text-2xl md:text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.5)]">
                  40%
                </p>
                <p className="text-[#B3E5FC] font-bold text-sm md:text-xl uppercase tracking-wider">
                  Liquidity
                </p>
              </div>

              {/* Center/Total */}
              <div className="absolute top-[48%] left-[49%] transform -translate-x-1/2 -translate-y-1/2 bg-[#FFE8D6] rounded-full p-3 md:p-5 border-4 border-black shadow-[0_4px_0_#000] z-30">
                <p className="text-black font-black text-sm md:text-xl whitespace-nowrap">
                  1B Supply
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Penguin Swimming - Right Side */}
        <motion.div
          className="absolute top-[30%] right-[10%] w-[30%] md:w-[20%] z-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/gifs/gif-6-1.gif"
            alt="Swimming Pengu"
            width={300}
            height={300}
            className="w-full h-auto drop-shadow-xl"
            unoptimized
          />
        </motion.div>

        {/* Shark Chasing - Further Back/Right */}
        <motion.div
          className="absolute top-[15%] right-[-5%] w-[35%] md:w-[25%] z-10"
          animate={{
            x: [0, -30, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image
            src="/gifs/gif-6-2.gif"
            alt="Shark"
            width={400}
            height={400}
            className="w-full h-auto drop-shadow-lg opacity-90"
            unoptimized
          />
        </motion.div>

        {/* Decorative Elements (Optional - Bubbles/Seaweed if available, or just CSS bubbles) */}
        {/* We can add some CSS bubbles for atmosphere */}
        <div className="absolute bottom-0 w-full h-full pointer-events-none z-0">
          {/* Simple CSS Bubbles could go here, but keeping it clean for now to match image */}
        </div>
      </div>
    </section>
  );
}
