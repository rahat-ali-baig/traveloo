import AboutSection from "@/views/web/home/About";
import HeroSection from "@/views/web/home/HeroSection";
import ProblemSolving from "@/views/web/home/ProblemSolving";
import HowItWorks from "@/views/web/home/HowItWorks";
import TripsGallery from "@/views/web/home/TripsGallery";
import OurTeam from "@/views/web/home/OurTeam";

const Home = () => {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <ProblemSolving />
      <AboutSection />
      <HowItWorks />
      <TripsGallery />
      <OurTeam />
    </main>
  );
};

export default Home;
