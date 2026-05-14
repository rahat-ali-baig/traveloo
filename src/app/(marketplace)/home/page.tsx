import Composer from "@/components/home/Composer";
import { FEED } from "@/components/home/data";
import FeedCard from "@/components/home/FeedCard";
import HomeHero from "@/components/home/HomeHero";

const HomePage = () => {
  return (
    <section className="min-w-0 space-y-4 pb-8">
      <HomeHero />
      <Composer />

      {FEED.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default HomePage;
