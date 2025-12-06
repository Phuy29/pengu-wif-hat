import Image from "next/image";
import * as motion from "motion/react-client";
import { SwapBox } from "../SwapBox";
import { ProgressRaised } from "../ProgressRaised";

export function HomeSection() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/1.png"
          alt="Home Background"
          fill
          priority
          className="object-center"
        />
      </div>

      <div className="absolute mt-15 md:mt-0 top-0 w-full h-full flex flex-col justify-between items-center">
        {/* Top Decoration - Keep Absolute */}
        <div className="w-[80%] md:absolute md:w-[33%] md:top-20 md:left-1/2 md:-translate-x-2/4 z-20">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/gifs/gif-1-2.gif" alt="Pengu wif hat main 1" />
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 items-end pb-10 md:pb-20 px-4 md:px-10 z-30 relative">
          {/* Left Column: Pengu & Socials */}
          <div className="flex flex-col justify-end items-center md:items-start space-y-4 order-2 md:order-1">
            {/* Pengu */}
            <div className="w-[60%] md:w-[80%]">
              <img src="/gifs/gif-1-1.gif" alt="Pengu wif hat main 1" />
            </div>

            {/* Socials */}
          </div>

          {/* Center Column: SwapBox */}
          <div className="flex justify-center items-center h-full order-1 md:order-2 mb-10 md:mb-0">
            <div className="w-[90%] md:w-[90%] z-30">
              <SwapBox />
            </div>
          </div>

          {/* Right Column: Progress Bar & Socials */}
          <div className="flex flex-col justify-end items-end h-full order-3 md:order-3">
            <div className="w-[20%] md:w-[30%] z-30 hidden md:block mb-4">
              <ProgressRaised />
            </div>

            {/* Socials */}
            <div className="w-full md:w-[80%] relative z-30">
              <div className="w-full z-0">
                <img src="/snow.png" alt="Snow Background" className="w-full" />
              </div>

              <div className="absolute bottom-4 left-4 flex space-x-2 w-full px-4">
                <div className="w-[20%] z-10 hover:scale-110 transition-transform cursor-pointer">
                  <img
                    src="/social-youtube.png"
                    alt="Youtube"
                    className="w-full"
                  />
                </div>
                <div className="w-[20%] z-10 hover:scale-110 transition-transform cursor-pointer">
                  <img
                    src="/social-tiktok.png"
                    alt="Tiktok"
                    className="w-full"
                  />
                </div>
                <div className="w-[20%] z-10 hover:scale-110 transition-transform cursor-pointer">
                  <img
                    src="/social-tele.png"
                    alt="Telegram"
                    className="w-full"
                  />
                </div>
                <div className="w-[20%] z-10 hover:scale-110 transition-transform cursor-pointer">
                  <img src="/social-X.png" alt="X" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
