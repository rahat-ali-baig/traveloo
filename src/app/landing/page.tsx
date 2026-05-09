// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/core/Loader";
import Header from "@/components/trash/Header";
import HeroSection from "@/components/trash/HeroSection";
import SolutionSection from "@/components/trash/SolutionSection";
import ProblemShowcase from "@/components/trash/ProblemShowcase";
import HowItWorks from "@/components/trash/HowItWorks";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!loaderComplete) {
    return <Loader onComplete={setLoaderComplete} />;
  }

  return (
    <main className="w-full overflow-y-auto relative">
      <Header />
      <HeroSection />
      <ProblemShowcase />
      <SolutionSection />
      <HowItWorks />
    </main>
  );
}