import Image from "next/image";
import * as motion from "motion/react-client";

export function RoadMapSection() {
  const phases = [
    {
      phase: "Phase 1",
      title: "The Discovery",
      narrative:
        "Pengu stumbles upon a legendary artifact: A Solana Dev's Beanie.",
      items: [
        "Concept Art & Branding",
        "Website Launch",
        "Community Building",
        "Socials Creation",
      ],
    },
    {
      phase: "Phase 2",
      title: "The Awakening",
      narrative: "Pengu dons the hat. IQ +200. He sees the blockchain matrix.",
      items: [
        "Smart Contract Audit",
        "Fair Launch / Presale",
        "Marketing Campaign",
        "CMC & CG Listings",
      ],
    },
    {
      phase: "Phase 3",
      title: "The Slide",
      narrative: "Why fly? Pengu harnesses the Aurora to slide to the moon.",
      items: [
        "CEX Listings",
        "Strategic Partnerships",
        "10,000 Holders",
        "Pengu Merch Store",
      ],
    },
    {
      phase: "Phase 4",
      title: "The Moon",
      narrative: "Touchdown. Roasting marshmallows on the craters.",
      items: [
        "Tier 1 Exchange Listings",
        "Pengu DAO Governance",
        "Global Events",
        "To The Moon!",
      ],
    },
  ];

  return (
    <section
      id="roadmap"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ zIndex: 70 }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/7.png"
          alt="RoadMap Background"
          fill
          priority
          className="object-center"
        />
      </div>

      <div className="absolute top-0 w-full h-full flex flex-col items-center min-h-screen">
        {/* Title */}
        {/* Title */}
        <div className="mt-16 z-30">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2
              className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_6px_0_#000] stroke-black"
              style={{ WebkitTextStroke: "3px black" }}
            >
              ROADMAP
            </h2>
          </motion.div>
        </div>

        {/* Roadmap Cards Container */}
        <div className="w-full max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 z-30 pb-32">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`w-full ${index % 2 === 0 ? "md:mt-0" : "md:mt-12"}`}
            >
              <div className="bg-[#FFE8D6] border-4 border-black rounded-3xl p-6 shadow-[0_8px_0_#000] hover:bg-[#FFDAB9] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_0_#000] group">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#7DD3FC] text-black px-4 py-1 rounded-full text-sm font-black border-2 border-black shadow-[0_2px_0_#000]">
                    {phase.phase}
                  </span>
                  <div className="h-4 w-4 rounded-full bg-[#F59E0B] border-2 border-black animate-pulse" />
                </div>

                <h3 className="text-2xl font-black text-black mb-2 group-hover:text-[#0ea5e9] transition-colors">
                  {phase.title}
                </h3>

                <p className="text-[#8B4513] italic mb-4 text-sm border-l-4 border-[#7DD3FC] pl-3 font-bold">
                  "{phase.narrative}"
                </p>

                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-black font-bold text-sm"
                    >
                      <span className="mr-2 text-[#0ea5e9] text-xl">❄</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Background Elements */}
        <div className="absolute h-[100%] top-[10%] right-[10%] z-0 pointer-events-none">
          <img src="/moon.png" alt="Moon" className="w-[70%] opacity-90" />
        </div>

        <div className="absolute bottom-[0%] left-[4%] w-[50%] translate-y-[5%] z-20 pointer-events-none">
          <img
            src="/gifs/gif-7-1.gif"
            alt="Pengu Seesaw"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </div>

        <div className="absolute bottom-[0%] right-[2%] w-[30%] translate-y-[15%] z-10 pointer-events-none">
          <img src="/gifs/gif-7-2.gif" alt="Pengu Campfire" />
        </div>
      </div>
    </section>
  );
}
