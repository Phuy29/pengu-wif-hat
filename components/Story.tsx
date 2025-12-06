"use client";

export function Story() {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
        THE LEGEND OF PENGU
      </h2>
      <div className="space-y-4 text-lg md:text-xl text-blue-100 font-medium leading-relaxed">
        <p>
          Meet <span className="text-[#F59E0B] font-bold">Pengu</span>, a
          penguin from Antarctica who stumbled upon a{" "}
          <span className="text-blue-300 font-bold">Solana Dev's beanie</span>.
        </p>
        <p>
          Putting it on boosted his IQ by{" "}
          <span className="text-green-400 font-bold">200 points</span>! 🧠✨
        </p>
        <p>
          He realized he doesn't need to fly to reach the moon... he just needs
          to <span className="italic text-cyan-300">slide on the aurora</span>.
          🌌🐧
        </p>
      </div>
    </div>
  );
}
