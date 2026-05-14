import Image from "next/image";
import type { Profile } from "./types";

const ProfileAvatar = ({
  profile,
  size = "md",
}: {
  profile: Profile;
  size?: "sm" | "md";
}) => (
  <div
    className={`relative shrink-0 overflow-hidden rounded-full border border-emerald-300/25 ${
      size === "sm" ? "h-9 w-9" : "h-11 w-11"
    }`}
  >
    <Image
      src={profile.avatar}
      alt={profile.name}
      fill
      sizes={size === "sm" ? "36px" : "44px"}
      className="object-cover"
    />
  </div>
);

export default ProfileAvatar;
