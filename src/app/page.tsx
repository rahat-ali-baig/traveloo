// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import ContentSection from "@/components/ContentSection";
import Header from "@/components/Header";
import FeaturesSection from "@/components/FeaturesSection";

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
      <Hero />
      {/* <FeaturesSection /> */}
      <ContentSection />
    </main>
  );
}