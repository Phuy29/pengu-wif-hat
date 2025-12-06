"use client";

export function ProgressRaised() {
  return (
    <div className="relative w-16 h-80 bg-[#FFE8D6] rounded-full border-4 border-black p-2 flex flex-col justify-end items-center shadow-[0_8px_0_#000]">
      {/* Label */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#7DD3FC] text-black font-black px-4 py-2 rounded-xl text-sm whitespace-nowrap shadow-[0_4px_0_#000] border-2 border-black z-30">
        $500K Raised
      </div>

      {/* Progress Bar */}
      <div className="w-full h-full bg-[#D4A373] rounded-full relative overflow-hidden border-2 border-black">
        <div
          className="absolute bottom-0 w-full bg-gradient-to-t from-[#0ea5e9] via-[#38bdf8] to-[#fcd34d] border-t-2 border-black transition-all duration-1000 ease-out"
          style={{ height: "60%" }}
        >
          {/* Bubbles animation effect could go here */}
        </div>
      </div>

      {/* Percentage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-white drop-shadow-[0_2px_0_#000] z-10">
        60%
      </div>

      {/* Bulb */}
      <div className="absolute -bottom-8 w-24 h-24 bg-[#7DD3FC] rounded-full border-4 border-black shadow-[0_4px_0_#000] flex items-center justify-center z-20">
        <div className="w-16 h-16 bg-[#FFE8D6] rounded-full border-2 border-black flex items-center justify-center">
          <span className="text-3xl">❄️</span>
        </div>
      </div>
    </div>
  );
}
