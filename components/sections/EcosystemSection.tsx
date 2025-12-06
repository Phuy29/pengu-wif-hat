import Image from "next/image";
import * as motion from "motion/react-client";

export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 30 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/3.png"
          alt="Ecosystem Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 w-full h-full min-h-screen">
        <div className="absolute bottom-[12%] right-0 translate-x-[50%] z-10">
          <img src="/wood.png" alt="Pengu wif hat main 3" className="w-[50%]" />
        </div>

        <div className="absolute top-[40%] right-[1%] z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <img
              src="/snowman.png"
              alt="Pengu wif hat main 3"
              className="w-[80%]"
            />
          </motion.div>
        </div>

        <div className="absolute top-[45%] right-[13%] z-0">
          <img src="/buoy.png" alt="Pengu wif hat main 3" className="w-[70%]" />
        </div>

        <div className="absolute bottom-[2%] right-[6%] w-[25%] translate-y-[10%] z-20">
          <img
            src="/gifs/gif-3-1.gif"
            alt="Pengu wif hat main 3"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </div>

        <div className="absolute top-[50%] left-[15%] w-[20%] z-10">
          <img src="/gifs/gif-3-2.gif" alt="Pengu wif hat main 3" />
        </div>

        <div className="absolute top-[50%] left-[35%] w-[20%] scale-x-[-1] z-10">
          <img src="/gifs/gif-3-3.gif" alt="Pengu wif hat main 3" />
        </div>

        <div className="absolute top-[17%] w-[20%] left-[10%] z-0">
          <img src="/eco-1.png" alt="Pengu wif hat main 3" className="" />
        </div>

        <div className="absolute top-[15%] w-[20%] left-[40%] z-0">
          <img src="/eco-2.png" alt="Pengu wif hat main 3" className="" />
        </div>

        <div className="absolute top-[17%] w-[20%] left-[70%] z-0">
          <img src="/eco-1.png" alt="Pengu wif hat main 3" className="" />
        </div>
      </div>
    </section>
  );
}
