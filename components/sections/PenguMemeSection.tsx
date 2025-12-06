import Image from "next/image";
import * as motion from "motion/react-client";

export function PenguMemeSection() {
  return (
    <section
      id="faqs"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 80 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/8.png"
          alt="PenguMeme Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 w-full h-full min-h-screen">
        <motion.div className="absolute w-[95%] top-[15%] left-1/2 -translate-x-2/4">
          <img
            src="/meme.png"
            alt="Pengu wif hat main 3"
            className="w-[100%]"
          />
        </motion.div>
      </div>
    </section>
  );
}
