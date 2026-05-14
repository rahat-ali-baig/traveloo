import type { FeedPost } from "./types";

export const IMAGES = {
  hunza:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  meadow:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  peaks:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  lake: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  beach:
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
  ali: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  sarah:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  usman:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
};

export const FEED: FeedPost[] = [
  {
    id: "user-hunza-story",
    type: "user",
    author: {
      name: "Ayesha Noor",
      handle: "@ayesha.travels",
      avatar: IMAGES.sarah,
      badge: "Traveler",
    },
    time: "18 min",
    location: "Altit, Hunza",
    text: "Reached the fort right before sunset and the whole valley turned gold. Saving this route for anyone planning a first northern trip.",
    image: IMAGES.hunza,
    stats: { likes: "2.8k", comments: "184", shares: "96" },
  },
  {
    id: "company-skardu-trip",
    type: "company",
    author: {
      name: "Alpine Trekkers PK",
      handle: "@alpinetrekkers",
      avatar: IMAGES.usman,
      badge: "Verified agency",
    },
    time: "42 min",
    location: "Skardu, Gilgit-Baltistan",
    text: "Our June Skardu circuit is open: Deosai, Shangrila, Upper Kachura, and a guided night under the stars. Transport, hotels, permits, and trip lead included.",
    image: IMAGES.lake,
    package: {
      title: "6 day Skardu summer circuit",
      price: "Rs. 50,000",
      dates: "Jun 14 - Jun 19",
      seats: "8 seats left",
    },
    stats: { likes: "4.1k", comments: "312", shares: "227" },
  },
  {
    id: "shared-company-post",
    type: "shared-company",
    author: {
      name: "Hamza Malik",
      handle: "@hamza.moves",
      avatar: IMAGES.ali,
      badge: "Trip curator",
    },
    sharedFrom: {
      name: "North Explore Co.",
      handle: "@northexplore",
      avatar: IMAGES.usman,
      badge: "Verified agency",
    },
    time: "1 hr",
    location: "Islamabad",
    text: "This looks like the cleanest Fairy Meadows plan I have seen this season. Good pacing, backup jeep slots, and a real cancellation policy.",
    image: IMAGES.meadow,
    package: {
      title: "Fairy Meadows guided trek",
      price: "Rs. 32,000",
      dates: "Jul 03 - Jul 07",
      seats: "12 seats left",
    },
    stats: { likes: "1.9k", comments: "128", shares: "75" },
  },
  {
    id: "shared-user-post",
    type: "shared-user",
    author: {
      name: "Sara Qureshi",
      handle: "@saraq",
      avatar: IMAGES.sarah,
      badge: "Community guide",
    },
    sharedFrom: {
      name: "Bilal Khan",
      handle: "@bilal_backpacks",
      avatar: IMAGES.ali,
      badge: "Traveler",
    },
    time: "2 hr",
    location: "Karachi",
    text: "Sharing Bilal's checklist because it answers half the questions people ask before their first mountain trip.",
    sharedText:
      "Pack lighter than you think, keep one dry layer in your day bag, and ask your operator for the exact hotel names before paying.",
    image: IMAGES.peaks,
    stats: { likes: "3.4k", comments: "201", shares: "144" },
  },
];

export const TRENDING = [
  { label: "Hunza family trips", value: "18 new packages" },
  { label: "Skardu under Rs. 55k", value: "11 verified agencies" },
  { label: "Women-led groups", value: "6 departures this week" },
  { label: "Weekend from Lahore", value: "24 creator posts" },
];

export const AGENCIES = [
  { name: "Alpine Trekkers PK", score: "4.9", trips: "38 trips" },
  { name: "Valley Tours", score: "4.8", trips: "26 trips" },
  { name: "Discover Pakistan", score: "4.7", trips: "41 trips" },
];
