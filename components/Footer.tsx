import Image from "next/image";

export function Footer() {
  return (
    <section className="relative w-full h-[300px] flex items-end justify-center pb-10">
      <Image
        src="/9.png"
        alt="Footer"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border-2 border-white/20">
        <p className="text-white font-black text-xl md:text-2xl text-center drop-shadow-[0_2px_0_#000]">
          $PENGU is a meme coin with utility. The hat stays on.
        </p>
      </div>
    </section>
  );
}
