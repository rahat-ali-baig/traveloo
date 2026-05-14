import Image from "next/image";
import {
  Bookmark,
  MapPin,
  Mountain,
  Route,
  ShieldCheck,
  Star,
  Store,
  Users,
  WalletCards,
} from "lucide-react";
import { AGENCIES, IMAGES, TRENDING } from "./data";

const SHORTCUTS = [
  { label: "My saved trips", icon: Bookmark },
  { label: "Following agencies", icon: Store },
  { label: "Traveler groups", icon: Users },
  { label: "Safety center", icon: ShieldCheck },
  { label: "Trip wallet", icon: WalletCards },
];

export const LeftRail = () => (
  <aside className="sticky top-22 hidden self-start pr-2 xl:block">
    <div className="rounded-lg border border-white/10 bg-[#080b08]/82 p-4 shadow-[0_22px_90px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <div className="relative mb-4 h-28 overflow-hidden rounded-lg">
        <Image
          src={IMAGES.city}
          alt="Marketplace cover"
          fill
          sizes="280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-xs text-emerald-200">Welcome back</p>
          <h2 className="text-lg font-semibold text-white">Adeel Raza</h2>
        </div>
      </div>
      <div className="space-y-1">
        {SHORTCUTS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-left text-sm text-white/58 transition hover:border-emerald-300/16 hover:bg-emerald-300/7 hover:text-white"
            >
              <Icon size={18} className="text-emerald-300" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>

    <div className="mt-4 rounded-lg border border-white/10 bg-[#080b08]/82 p-4 shadow-[0_22px_90px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <h3 className="mb-3 text-sm font-semibold text-white">Trip pulse</h3>
      <div className="space-y-3">
        {[
          { label: "Bookings today", value: "1,248" },
          { label: "Verified agencies", value: "312" },
          { label: "Traveler posts", value: "8.7k" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-white/45">{stat.label}</span>
            <span className="font-semibold text-emerald-200">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export const RightRail = () => (
  <aside className="sticky top-22 hidden self-start pl-2 lg:block">
    <div className="rounded-lg border border-white/10 bg-[#080b08]/82 p-4 shadow-[0_22px_90px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Trending now</h3>
        <Mountain size={18} className="text-emerald-300" />
      </div>
      <div className="space-y-3">
        {TRENDING.map((item) => (
          <button
            key={item.label}
            className="w-full rounded-lg border border-white/7 bg-white/[0.035] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:border-emerald-300/20 hover:bg-emerald-300/7 hover:shadow-[0_12px_36px_rgba(94,233,181,0.08)]"
          >
            <p className="text-sm font-medium text-white/78">{item.label}</p>
            <p className="mt-1 text-xs text-white/38">{item.value}</p>
          </button>
        ))}
      </div>
    </div>

    <div className="mt-4 rounded-lg border border-white/10 bg-[#080b08]/82 p-4 shadow-[0_22px_90px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Top agencies</h3>
        <Store size={18} className="text-emerald-300" />
      </div>
      <div className="space-y-4">
        {AGENCIES.map((agency) => (
          <div
            key={agency.name}
            className="flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-sm font-medium text-white/76">{agency.name}</p>
              <p className="text-xs text-white/38">{agency.trips}</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/6 px-2 py-1 text-xs text-emerald-200">
              <Star size={12} fill="currentColor" />
              {agency.score}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-4 overflow-hidden rounded-lg border border-emerald-300/15 bg-emerald-300/7 shadow-[0_22px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="relative h-40">
        <Image
          src={IMAGES.beach}
          alt="Coastal trip"
          fill
          sizes="320px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 to-black/10" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/80">
            New category
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Coastal escapes
          </h3>
        </div>
      </div>
      <div className="space-y-2 p-4 text-sm text-white/58">
        <p className="flex items-center gap-2">
          <MapPin size={15} className="text-emerald-300" />
          Karachi, Gwadar, Kund Malir
        </p>
        <p className="flex items-center gap-2">
          <Route size={15} className="text-emerald-300" />
          14 verified weekend plans
        </p>
      </div>
    </div>
  </aside>
);
