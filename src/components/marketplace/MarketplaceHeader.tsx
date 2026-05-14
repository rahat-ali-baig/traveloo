import Link from "next/link";
import PrimaryButton from "@/components/core/PrimaryButton";
import {
  Bell,
  BriefcaseBusiness,
  Compass,
  Home,
  MapPinned,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/home", icon: Home, active: true },
  { label: "Explore", href: "#explore", icon: Compass },
  { label: "Trips", href: "#trips", icon: BriefcaseBusiness },
  { label: "Map", href: "#map", icon: MapPinned },
];

const MarketplaceHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030503]/78 shadow-[0_18px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
      <div className="mx-auto flex h-18 w-full max-w-[1680px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/home" className="flex shrink-0 items-center gap-3">
          <span className="font-greatvibes text-2xl font-normal leading-none tracking-normal text-white sm:text-[2rem] md:text-[2.45rem]">
            Safarly
          </span>
        </Link>

        <label className="hidden min-w-0 flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_32px_rgba(0,0,0,0.18)] transition focus-within:border-emerald-400/40 focus-within:bg-white/[0.09] md:flex">
          <Search size={18} className="shrink-0 text-emerald-300/70" />
          <input
            className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
            placeholder="Search trips, agencies, places, creators"
            type="search"
          />
        </label>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex h-10 items-center gap-2 overflow-hidden rounded-full border px-4 text-sm font-medium transition ${
                  item.active
                    ? "border-emerald-300/60 bg-white text-black shadow-[0_12px_40px_rgba(94,233,181,0.18)]"
                    : "border-white/8 bg-white/[0.04] text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-emerald-300/25 hover:bg-emerald-300/8 hover:text-white"
                }`}
              >
                <span className="absolute inset-0 translate-y-full bg-linear-to-t from-emerald-300/16 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
                <Icon size={17} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <div className="pointer-events-none absolute -inset-1 rounded-full bg-linear-to-r from-emerald-300/22 via-white/12 to-amber-200/18 blur-md" />
            <PrimaryButton
              className="relative h-10 px-5! py-0! text-[0.78rem] font-medium shadow-none!"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(94,233,181,0.12))",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 34px rgba(94,233,181,0.12)",
                backdropFilter: "blur(16px)",
              }}
            >
              <Plus size={15} />
              Post
              <Sparkles size={13} className="text-emerald-200/80" />
            </PrimaryButton>
          </div>
          {[MessageCircle, Bell, Settings].map((Icon, index) => (
            <button
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-200 hover:shadow-[0_12px_32px_rgba(94,233,181,0.12)]"
              aria-label={index === 0 ? "Messages" : index === 1 ? "Notifications" : "Settings"}
            >
              <Icon size={18} />
            </button>
          ))}
          <button
            className="relative h-10 w-10 overflow-hidden rounded-full border border-emerald-200/50 bg-linear-to-br from-emerald-200 via-lime-100 to-amber-100 shadow-[0_10px_34px_rgba(94,233,181,0.18)]"
            aria-label="Open profile"
          >
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black">
              AR
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
