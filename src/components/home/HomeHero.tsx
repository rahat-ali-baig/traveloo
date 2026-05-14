import Image from "next/image";
import PrimaryButton from "@/components/core/PrimaryButton";
import { Camera } from "lucide-react";
import { IMAGES } from "./data";

const HomeHero = () => (
  <div className="overflow-hidden rounded-lg border border-white/10 bg-[#080b08]/88 shadow-[0_26px_120px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
    <div className="relative h-64">
      <Image
        src={IMAGES.peaks}
        alt="Safarly marketplace hero"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1023px) 100vw, 620px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#080b08] via-black/34 to-black/5" />
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/12 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
          <Camera size={13} />
          Live marketplace
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Discover trips through people, agencies, and real travel stories.
        </h1>
        <div className="mt-4 flex flex-wrap gap-3">
          <PrimaryButton className="h-10 px-5! py-0! text-[0.75rem] shadow-none!">
            Find Trips
          </PrimaryButton>
          <PrimaryButton
            className="h-10 px-5! py-0! text-[0.75rem] shadow-none!"
            style={{
              background: "rgba(123, 203, 146, 0.1)",
              border: "1px solid rgba(123, 203, 146, 0.55)",
            }}
          >
            Follow Agencies
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 border-t border-white/8 bg-white/2.5 text-center text-xs text-white/45">
      <div className="p-4">
        <p className="text-lg font-semibold text-white">312</p>
        agencies
      </div>
      <div className="border-x border-white/8 p-4">
        <p className="text-lg font-semibold text-white">1.2k</p>
        live trips
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-white">8.7k</p>
        stories
      </div>
    </div>
  </div>
);

export default HomeHero;
