"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/core/PrimaryButton";

const PILLARS = [
  {
    icon: "✦",
    title: "Verified Companies",
    body: "Every tour operator on Safar is vetted, reviewed, and held to a transparent standard — no blind bookings.",
  },
  {
    icon: "◈",
    title: "Real Pricing",
    body: "No more DM negotiations. Browse fixed, honest prices set by the operators themselves.",
  },
  {
    icon: "⬡",
    title: "Accountable Platform",
    body: "Dispute resolution, rating systems, and booking records — because your trip deserves a paper trail.",
  },
];

const AboutSection = () => {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden bg-[#030805]">
      {/* Top border fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-500/25 to-transparent" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-130 w-130 -translate-y-1/4 translate-x-1/4 rounded-full bg-emerald-900/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-100 w-100 -translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-950/30 blur-[100px]" />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center border-r border-white/10 lg:p-20 p-10">
          <p className="mb-4 flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.5em] text-emerald-400/60 sm:mb-5">
            <span className="block h-px w-6 bg-emerald-500/40" />
            About Safar
          </p>
          <h2 className="font-poppins text-[clamp(1rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-tight">
            <span className="bg-linear-to-b from-white via-white/90 to-white/45 bg-clip-text text-transparent">
              Pakistan&apos;s first trusted travel marketplace.
            </span>
          </h2>
          <div className="mt-5 h-px w-12 bg-linear-to-r from-emerald-500/60 to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <p className="font-sans text-[clamp(0.9rem,1.5vw,1rem)] font-light leading-[1.75] text-white/60">
            Pakistan&apos;s tourism industry runs on WhatsApp threads, handshake
            deals, and word-of-mouth. For travellers, that means uncertainty.
            For tour operators, that means invisibility.
          </p>
          <p className="font-sans text-[clamp(0.9rem,1.5vw,1rem)] font-light leading-[1.75] text-white/60">
            Safar changes that. We built a single platform where verified
            companies list their trips at honest prices, and travellers can
            book, review, and travel with confidence — all in one place.
          </p>
          <div className="mt-3">
            <PrimaryButton onClick={() => router.push("/about")}>
              Our Story
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* ── PILLARS ── */}
      <div className="w-full border-b border-t border-white/10 px-4 py-16 sm:px-6 md:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-6 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/20 hover:bg-emerald-950/10 sm:p-7"
            >
              {/* Corner glow on hover */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-emerald-500/0 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/10" />

              <span className="mb-4 text-4xl text-emerald-400/50 transition-colors duration-300 group-hover:text-emerald-400/80 sm:mb-5 sm:text-5xl">
                {p.icon}
              </span>
              <h3 className="mb-2 font-montserrat text-base font-semibold leading-snug text-white/88 sm:mb-3 sm:text-lg">
                {p.title}
              </h3>
              <p className="font-poppins text-xs font-light leading-relaxed text-white/45 sm:text-sm">
                {p.body}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-emerald-500/50 to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* ── MISSION STRIP ── */}
      <div className="relative w-full border-t border-white/5">
        <div className="px-4 py-12 sm:px-6 md:px-8 lg:py-16">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
            <p className="max-w-xl font-serif text-[clamp(1rem,2.2vw,1.6rem)] font-light italic leading-snug text-white/55">
              &quot;From Hunza to Karachi — every traveller deserves a trip that
              works the way it was promised.&quot;
            </p>
            <div className="flex shrink-0 flex-col items-center gap-1 sm:items-end">
              <span className="font-sans text-[9px] uppercase tracking-[0.38em] text-emerald-400/50 sm:text-[10px]">
                Our Mission
              </span>
              <span className="font-serif text-xs font-light text-white/30 sm:text-sm">
                — The Safar Team
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
};

export default AboutSection;
