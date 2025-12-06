import Image from "next/image";
import * as motion from "motion/react-client";

export function SocialTaskSection() {
  return (
    <section
      id="social-task"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 40 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/4.png"
          alt="SocialTask Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 w-full h-full min-h-screen">
        <motion.div className="absolute top-[55%] w-[30%] left-[15%]">
          <img src="/ice-collum.png" alt="Pengu wif hat main 3" />
        </motion.div>

        <motion.div className="absolute bottom-[2%] right-[6%] w-[25%] translate-y-[10%]">
          <img
            src="/gifs/gif-4-1.gif"
            alt="Pengu wif hat main 3"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </motion.div>

        <motion.div className="absolute top-[44%] left-[27%] w-[20%]">
          <img src="/gifs/gif-4-2.gif" alt="Pengu wif hat main 3" />
        </motion.div>

        <motion.div className="absolute top-[49%] left-[14%] w-[20%]">
          <img src="/gifs/gif-4-3.gif" alt="Pengu wif hat main 3" />
        </motion.div>
      </div>
    </section>
  );
}
