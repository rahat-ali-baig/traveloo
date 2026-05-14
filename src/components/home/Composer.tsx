import PrimaryButton from "@/components/core/PrimaryButton";
import { ImageIcon, Plane, Sparkles } from "lucide-react";
import { IMAGES } from "./data";
import ProfileAvatar from "./ProfileAvatar";

const Composer = () => (
  <section className="rounded-lg border border-white/10 bg-[#080b08]/88 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
    <div className="flex items-center gap-3">
      <ProfileAvatar
        profile={{
          name: "Adeel Raza",
          handle: "@adeel",
          avatar: IMAGES.ali,
        }}
      />
      <button className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-left text-sm text-white/38 transition hover:border-emerald-300/25 hover:bg-white/8">
        Share a photo, ask for a route, or post your next trip
      </button>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/8 pt-3">
      {[
        { label: "Photo", icon: ImageIcon },
        { label: "Trip", icon: Plane },
        { label: "Story", icon: Sparkles },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            className="flex h-10 items-center justify-center gap-2 rounded-lg text-xs font-medium text-white/50 transition hover:bg-white/6 hover:text-emerald-200"
          >
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </div>
    <div className="mt-4 flex justify-end">
      <PrimaryButton className="h-10 px-5! py-0! text-[0.75rem] shadow-none!">
        Publish Trip Post
      </PrimaryButton>
    </div>
  </section>
);

export default Composer;
