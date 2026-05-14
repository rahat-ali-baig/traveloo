import Image from "next/image";
import PrimaryButton from "@/components/core/PrimaryButton";
import {
  BadgeCheck,
  CalendarDays,
  Heart,
  MessageSquare,
  Repeat2,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import type {
  CompanyPost,
  FeedPost,
  Profile,
  SharedCompanyPost,
  SharedUserPost,
  UserPost,
} from "./types";

const MergedAvatars = ({
  primary,
  secondary,
}: {
  primary: Profile;
  secondary: Profile;
}) => (
  <div className="relative h-12 w-16 shrink-0">
    <div className="absolute left-0 top-1 h-11 w-11 overflow-hidden rounded-full border-2 border-[#080b08]">
      <Image
        src={secondary.avatar}
        alt={secondary.name}
        fill
        sizes="44px"
        className="object-cover"
      />
    </div>
    <div className="absolute right-0 top-0 h-12 w-12 overflow-hidden rounded-full border-2 border-emerald-300/45 shadow-[0_0_0_4px_rgba(8,11,8,0.92)]">
      <Image
        src={primary.avatar}
        alt={primary.name}
        fill
        sizes="48px"
        className="object-cover"
      />
    </div>
    <span className="absolute bottom-0 left-8 flex h-5 w-5 items-center justify-center rounded-full border border-[#080b08] bg-emerald-400 text-black">
      <Repeat2 size={12} />
    </span>
  </div>
);

const PostHeader = ({
  author,
  sharedFrom,
  time,
  location,
  action,
}: {
  author: Profile;
  sharedFrom?: Profile;
  time: string;
  location: string;
  action?: string;
}) => (
  <div className="flex items-start gap-3">
    {sharedFrom ? (
      <MergedAvatars primary={author} secondary={sharedFrom} />
    ) : (
      <ProfileAvatar profile={author} />
    )}
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="truncate text-sm font-semibold text-white">
          {author.name}
        </h3>
        {sharedFrom ? (
          <>
            <Repeat2 size={13} className="text-white/32" />
            <h3 className="truncate text-sm font-semibold text-white/70">
              {sharedFrom.name}
            </h3>
          </>
        ) : null}
        {author.badge ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
            <BadgeCheck size={12} />
            {author.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-0.5 text-xs text-white/40">
        {action ? `${action} - ` : ""}
        {author.handle}
        {sharedFrom ? ` shared ${sharedFrom.handle}` : ""} - {time} -{" "}
        {location}
      </p>
    </div>
  </div>
);

const EngagementBar = ({ stats }: { stats: FeedPost["stats"] }) => (
  <div className="mt-5 border-t border-white/8 pt-3">
    <div className="mb-3 flex items-center justify-between text-xs text-white/38">
      <span>{stats.likes} inspired</span>
      <span>
        {stats.comments} comments - {stats.shares} shares
      </span>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {[
        { label: "Inspire", icon: Heart },
        { label: "Comment", icon: MessageSquare },
        { label: "Share", icon: Repeat2 },
        { label: "Send", icon: Send },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent text-xs font-medium text-white/48 transition hover:border-emerald-300/18 hover:bg-emerald-300/8 hover:text-emerald-200 hover:shadow-[0_10px_28px_rgba(94,233,181,0.08)]"
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const TripPackagePanel = ({
  post,
}: {
  post: CompanyPost | SharedCompanyPost;
}) => (
  <div className="mt-4 overflow-hidden rounded-lg border border-emerald-400/18 bg-linear-to-b from-emerald-400/9 to-white/2.5 shadow-[0_22px_70px_rgba(0,0,0,0.26)]">
    <div className="relative h-80">
      <Image
        src={post.image}
        alt={post.package.title}
        fill
        sizes="(max-width: 1023px) 100vw, 620px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/10 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-medium text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <ShieldCheck size={13} />
            Verified package
          </p>
          <h4 className="max-w-md text-2xl font-semibold tracking-tight text-white">
            {post.package.title}
          </h4>
        </div>
        <p className="rounded-full border border-white/50 bg-white/92 px-4 py-2 text-sm font-bold text-black shadow-[0_10px_34px_rgba(0,0,0,0.26)] backdrop-blur">
          {post.package.price}
        </p>
      </div>
    </div>
    <div className="grid gap-3 border-t border-white/8 p-4 text-sm text-white/64 sm:grid-cols-3">
      <span className="flex items-center gap-2">
        <CalendarDays size={16} className="text-emerald-300" />
        {post.package.dates}
      </span>
      <span className="flex items-center gap-2">
        <Users size={16} className="text-emerald-300" />
        {post.package.seats}
      </span>
      <PrimaryButton className="h-10 px-4! py-0! text-[0.72rem] shadow-none!">
        View trip
      </PrimaryButton>
    </div>
  </div>
);

const TravelImage = ({ post }: { post: UserPost | SharedUserPost }) => {
  if (!post.image) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/8 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <div className="relative h-96">
        <Image
          src={post.image}
          alt={post.location}
          fill
          sizes="(max-width: 1023px) 100vw, 620px"
          className="object-cover"
        />
      </div>
    </div>
  );
};

const SharedCompanyContent = ({ post }: { post: SharedCompanyPost }) => (
  <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
    <PostHeader
      author={post.sharedFrom}
      time="Agency post"
      location={post.location}
      action="originally posted by"
    />
    <TripPackagePanel post={post} />
  </div>
);

const SharedUserContent = ({ post }: { post: SharedUserPost }) => (
  <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
    <PostHeader
      author={post.sharedFrom}
      time="Traveler note"
      location="Northern routes"
      action="originally posted by"
    />
    <p className="mt-3 text-sm leading-6 text-white/68">{post.sharedText}</p>
    <TravelImage post={post} />
  </div>
);

const FeedCard = ({ post }: { post: FeedPost }) => (
  <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#080b08]/88 p-4 shadow-[0_26px_100px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition duration-300 hover:border-emerald-300/22 hover:shadow-[0_30px_120px_rgba(0,0,0,0.42),0_0_60px_rgba(94,233,181,0.055)]">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-300/30 to-transparent opacity-60" />
    <div className="pointer-events-none absolute inset-x-6 top-0 h-20 bg-linear-to-b from-white/[0.035] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative z-10">
      <PostHeader
        author={post.author}
        sharedFrom={
          post.type === "shared-company" || post.type === "shared-user"
            ? post.sharedFrom
            : undefined
        }
        time={post.time}
        location={post.location}
        action={
          post.type === "shared-company"
            ? "shared a company trip"
            : post.type === "shared-user"
              ? "shared a traveler post"
              : undefined
        }
      />
      <p className="mt-4 text-sm leading-6 text-white/72">{post.text}</p>

      {post.type === "company" ? <TripPackagePanel post={post} /> : null}
      {post.type === "user" ? <TravelImage post={post} /> : null}
      {post.type === "shared-company" ? (
        <SharedCompanyContent post={post} />
      ) : null}
      {post.type === "shared-user" ? <SharedUserContent post={post} /> : null}

      <EngagementBar stats={post.stats} />
    </div>
  </article>
);

export default FeedCard;
