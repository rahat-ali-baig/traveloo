// components/MorphingShowcaseSimple.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

export default function MorphingShowcaseSimple() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const features = [
    {
      id: 1,
      title: "Verified Operators",
      description:
        "Every tour operator undergoes rigorous background checks and license verification.",
      points: [
        "Background verified",
        "License authenticated",
        "Regular audits",
        "Quality assured",
      ],
      svgShape: "#shape1",
    },
    {
      id: 2,
      title: "Secure Escrow Payments",
      description:
        "We hold your payment safely until your trip is successfully completed.",
      points: [
        "Money held safely",
        "Released post-trip",
        "Fraud protection",
        "Multiple payment options",
      ],
      svgShape: "#shape2",
    },
    {
      id: 3,
      title: "Verified Reviews System",
      description:
        "Only travelers who completed their booking can leave authenticated reviews.",
      points: [
        "Verified purchasers only",
        "Cannot be deleted",
        "Photo verification",
        "Detailed ratings",
      ],
      svgShape: "#shape3",
    },
    {
      id: 4,
      title: "Smart Digital Contracts",
      description:
        "Every booking includes a legally binding contract with clear terms.",
      points: [
        "Legally binding",
        "Clear cancellation terms",
        "Service guarantees",
        "Instant access",
      ],
      svgShape: "#shape4",
    },
    {
      id: 5,
      title: "24/7 Concierge Protection",
      description:
        "Our support team is available around the clock for any issues.",
      points: [
        "24/7 availability",
        "Local expertise",
        "Emergency response",
        "Multi-language support",
      ],
      svgShape: "#shape5",
    },
    {
      id: 6,
      title: "Money-Back Guarantee",
      description:
        "Full refund protection if your tour doesn't match the description.",
      points: [
        "Full refund protection",
        "Trip cancellation cover",
        "Service mismatch cover",
        "Hassle-free claims",
      ],
      svgShape: "#shape6",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);
    setIsMounted(true);

    // Set initial shape to first feature's shape after mount
    setTimeout(() => {
      if (morphPathRef.current) {
        gsap.set(morphPathRef.current, {
          morphSVG: features[0].svgShape,
        });
      }
    }, 10);
  }, []);

  const morphToShape = (shapeId: string, direction: "next" | "prev") => {
    if (!morphPathRef.current || isAnimating) return;

    setIsAnimating(true);

    const entranceProps =
      direction === "next" ? { x: 30, opacity: 0 } : { x: -30, opacity: 0 };

    gsap.to(".feature-content", {
      ...entranceProps,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(morphPathRef.current, {
          morphSVG: shapeId,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.fromTo(
          ".feature-content",
          {
            x: direction === "next" ? -30 : 30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          },
        );
      },
    });
  };

  const handleNext = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % features.length;
    morphToShape(features[nextIndex].svgShape, "next");
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const prevIndex =
      currentIndex === 0 ? features.length - 1 : currentIndex - 1;
    morphToShape(features[prevIndex].svgShape, "prev");
    setCurrentIndex(prevIndex);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    const direction = index > currentIndex ? "next" : "prev";
    morphToShape(features[index].svgShape, direction);
    setCurrentIndex(index);
  };

  if (!isMounted) {
    return (
      <section className="relative w-full min-h-screen bg-white">
        <div className="absolute inset-0 bg-white" />
      </section>
    );
  }

  const currentFeature = features[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-linear-to-b from-white via-emerald-50/20 to-white overflow-hidden"
    >
      {/* Hidden SVG Definitions - Fixed Clean Paths */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="morphGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Shape 1 - Shield (Verified) */}
          <path
            id="shape1"
            d="M50,10 L85,25 L85,55 C85,80 50,95 50,95 C50,95 15,80 15,55 L15,25 Z"
          />

          {/* Shape 2 - Padlock (Security) */}
          <path
            id="shape2"
            d="M35,45 L35,30 C35,22 42,15 50,15 C58,15 65,22 65,30 L65,45 M25,45 L75,45 L75,80 L25,80 Z M50,55 L50,70"
          />

          {/* Shape 3 - Star (Reviews/Rating) */}
          <path
            id="shape3"
            d="M50,10 L58,35 L85,35 L63,52 L71,78 L50,62 L29,78 L37,52 L15,35 L42,35 Z"
          />

          {/* Shape 4 - Document/Contract */}
          <path
            id="shape4"
            d="M25,15 L65,15 L65,35 L85,35 L85,85 L25,85 Z M65,15 L65,35 L85,35"
          />

          {/* Shape 5 - Headset (Support) */}
          <path
            id="shape5"
            d="M25,55 C25,38 36,25 50,25 C64,25 75,38 75,55 L75,70 L62,70 L62,55 C62,48 57,42 50,42 C43,42 38,48 38,55 L38,70 L25,70 Z"
          />

          {/* Shape 6 - Money/Circle with Arrow (Guarantee) */}
          <path
            id="shape6"
            d="M50,15 C30,15 15,30 15,50 C15,70 30,85 50,85 C70,85 85,70 85,50 C85,30 70,15 50,15 Z M50,35 L50,65 M38,50 L50,38 L62,50 M62,50 L50,62 L38,50"
          />
        </defs>
      </svg>

      {/* Section Header */}
      <div className="relative z-20 text-center py-16 md:py-20">
        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
          The Solution
        </span>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
          How We're Fixing
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl bg-linear-to-r font-playfair italic font-bold from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
            Travel in Pakistan
          </span>
        </h2>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Sticky SVG Container */}
          <div className="lg:w-2/5">
            <div className="relative w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 -mt-10">
              {/* Glow effect behind SVG */}
              <div className="absolute inset-0 bg-linear-to-br from-emerald-200/20 to-emerald-300/20 rounded-full blur-2xl" />
              <svg
                ref={svgRef}
                className="w-full h-full relative z-10"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                {/* Background subtle shape */}
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#D1FAE5"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                />

                {/* Morphing path with stroke */}
                <path
                  ref={morphPathRef}
                  id="morph-path"
                  fill="rgba(5, 150, 105, 0.05)"
                  stroke="url(#morphGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M50,10 L85,25 L85,55 C85,80 50,95 50,95 C50,95 15,80 15,55 L15,25 Z"
                />
              </svg>
            </div>
          </div>

          {/* Right Side - Feature Content with Pagination */}
          <div className="lg:w-3/5">
            <div className="min-h-80 md:min-h-96 flex flex-col">
              {/* Content Area */}
              <div className="flex-1">
                <div className="feature-content">
                  {/* Feature number */}
                  <div className="text-5xl font-bold text-emerald-200/50 mb-3">
                    {(currentIndex + 1).toString().padStart(2, "0")}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                    {currentFeature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    {currentFeature.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3">
                    {currentFeature.points.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                          <svg
                            className="w-3 h-3 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between pt-3">
                {/* Dots Navigation */}
                <div className="flex gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`transition-all duration-300 ${
                        index === currentIndex
                          ? "w-8 h-2 bg-emerald-600 rounded-full"
                          : "w-2 h-2 bg-emerald-300 rounded-full hover:bg-emerald-400"
                      }`}
                      disabled={isAnimating}
                    />
                  ))}
                </div>

                {/* Prev/Next Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={isAnimating}
                    className="group relative inline-flex items-center justify-center w-10 h-10 text-emerald-700 bg-white border border-emerald-200 rounded-full hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={isAnimating}
                    className="group relative inline-flex items-center justify-center w-10 h-10 text-white bg-linear-to-r from-emerald-600 to-emerald-700 rounded-full hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-emerald-300/20 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-emerald-300/20 hidden lg:block" />
    </section>
  );
}
