"use client";

import Image from "next/image";

import * as motion from "motion/react-client";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 20 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/4.png"
          alt="Igloo Village Background"
          fill
          priority
          className="object-center"
        />
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden min-h-screen">
        {/* Title: ABOUT */}
        <div className="absolute top-[5%] md:top-[8%] z-30">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2
              className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_6px_0_#000] stroke-black"
              style={{ WebkitTextStroke: "3px black" }}
            >
              ABOUT
            </h2>
          </motion.div>
        </div>

        {/* Narrative Content Box - Improved UI */}
        <div className="absolute top-[18%] md:top-[22%] w-[85%] md:w-[50%] text-center z-30 bg-[#FFE8D6] p-6 md:p-8 rounded-3xl border-4 border-black shadow-[0_8px_0_#000] transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl md:text-4xl font-black text-black mb-3 uppercase tracking-tight">
            The Legend of Pengu
          </h2>
          <p className="text-base md:text-lg text-[#8B4513] font-bold leading-relaxed font-sans">
            Pengu, a penguin from Antarctica, accidentally found a Solana Dev's
            beanie.
            <br />
            <span className="block mt-2 text-[#0ea5e9] text-lg md:text-xl drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]">
              Mission: Put on hat → IQ +200 → "Slide on the aurora" to the Moon!
            </span>
          </p>
          <div className="mt-4 text-xl md:text-3xl font-black text-[#F59E0B] uppercase tracking-widest drop-shadow-[0_2px_0_#000] rotate-2">
            "Stay Cool, Get Rich"
          </div>
        </div>

        {/* Igloo Village Visual */}
        <div className="absolute bottom-0 w-full flex justify-center z-10 pointer-events-none">
          <Image
            src="/about-house.png"
            alt="Igloo Village"
            width={1000}
            height={600}
            className="w-full md:w-[80%] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Static Pengu - Removed Scroll Animation */}
        <div className="absolute bottom-[20%] left-[10%] z-40">
          <Image
            src="/gifs/gif-2-1.gif"
            alt="Sliding Pengu"
            width={300}
            height={400}
            className="drop-shadow-2xl"
          />
          {/* Speech Bubble */}
          <div className="absolute -top-10 right-0 bg-white px-3 py-1.5 rounded-xl border-2 border-black text-xs md:text-sm font-black whitespace-nowrap shadow-lg animate-bounce text-black">
            WEEEEEEEE!
            <div className="absolute bottom-[-8px] right-4 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-black border-r-[8px] border-r-transparent"></div>
            <div className="absolute bottom-[-5px] right-4 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-white border-r-[6px] border-r-transparent"></div>
          </div>
        </div>

        {/* Party Penguins (Decorations) */}
        <div className="absolute bottom-[12%] right-[5%] md:right-[15%] z-20 w-[90px] md:w-[130px]">
          <Image
            src="/gifs/gif-2-2.gif"
            alt="Party Pengu Right"
            width={130}
            height={130}
            className="scale-x-[-1]"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
