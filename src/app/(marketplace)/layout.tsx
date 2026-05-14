import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import { LeftRail, RightRail } from "@/components/home/HomeSidebars";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safarly Home | Travel Marketplace",
  description: "Discover trips, traveler stories, and trusted agencies on Safarly.",
};

export default function MarketplaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[#030503] text-white">
      {/* Keep this root free of overflow utilities; ancestor overflow can stop sticky sidebars from sticking. */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(94,233,181,0.10)_0%,rgba(3,5,3,0)_28%,rgba(201,162,39,0.08)_58%,rgba(3,5,3,0)_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_0_1px,transparent_1px)] bg-size-[72px_72px] opacity-25" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-linear-to-b from-emerald-300/8 via-white/3 to-transparent blur-3xl" />
      <MarketplaceHeader />
      <div className="relative z-10 pt-18">
        <main className="mx-auto grid w-full max-w-420 grid-cols-1 items-start gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,820px)_340px] lg:justify-center lg:px-8 xl:grid-cols-[300px_minmax(0,820px)_360px]">
          <LeftRail />
          {children}
          <RightRail />
        </main>
      </div>
    </div>
  );
}
