"use client";

import ParticleGlobe from "@/components/core/ParticleGlobe";

const ScrollParticleGlobe = () => {
  return (
    <div className="relative h-[min(82vw,620px)] min-h-90 w-full lg:h-[min(42vw,650px)]">
      <div className="absolute inset-0 cursor-grab overflow-hidden active:cursor-grabbing">
        <ParticleGlobe />
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 border-l border-[#1A3D2B]/30 pl-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#2E6B47]">
        Hover the atlas
      </div>
    </div>
  );
};

export default ScrollParticleGlobe;
