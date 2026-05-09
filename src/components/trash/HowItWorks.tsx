"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Sparkles,
  CreditCard,
  MapPinned,
  Building2,
  TrendingUp,
  Users,
  LayoutGrid,
  Globe,
  Star,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"traveler" | "company">("traveler");
  const [isMounted, setIsMounted] = useState(false);

  const travelerSteps = [
    {
      icon: <Compass size={36} strokeWidth={1.5} />,
      title: "Discover Trips",
      desc: "Browse verified tours based on budget, region and activity.",
    },
    {
      icon: <Sparkles size={36} strokeWidth={1.5} />,
      title: "Plan with AI",
      desc: "Use our AI itinerary planner to customize your perfect trip.",
    },
    {
      icon: <CreditCard size={36} strokeWidth={1.5} />,
      title: "Book Securely",
      desc: "Pay securely and receive instant booking confirmation.",
    },
    {
      icon: <MapPinned size={36} strokeWidth={1.5} />,
      title: "Travel Easy",
      desc: "Track bookings and chat directly with operators anytime.",
    },
    {
      icon: <Globe size={36} strokeWidth={1.5} />,
      title: "Enjoy Adventure",
      desc: "Experience Pakistan with trusted verified companies.",
    },
    {
      icon: <Star size={36} strokeWidth={1.5} />,
      title: "Leave Review",
      desc: "Share verified feedback to help future travelers decide.",
    },
  ];

  const companySteps = [
    {
      icon: <Building2 size={36} strokeWidth={1.5} />,
      title: "Apply & Verify",
      desc: "Submit documents and get verified instantly by our team.",
    },
    {
      icon: <LayoutGrid size={36} strokeWidth={1.5} />,
      title: "Create Listings",
      desc: "Publish your packages professionally on marketplace.",
    },
    {
      icon: <Users size={36} strokeWidth={1.5} />,
      title: "Receive Bookings",
      desc: "Manage incoming traveler bookings efficiently.",
    },
    {
      icon: <MapPinned size={36} strokeWidth={1.5} />,
      title: "Track Trips",
      desc: "Stay updated with traveler and booking status.",
    },
    {
      icon: <TrendingUp size={36} strokeWidth={1.5} />,
      title: "Build Reviews",
      desc: "Gain trust through verified public reviews.",
    },
    {
      icon: <Rocket size={36} strokeWidth={1.5} />,
      title: "Scale Business",
      desc: "Grow beyond social media limitations.",
    },
  ];

  const currentSteps = activeTab === "traveler" ? travelerSteps : companySteps;

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation on mount and tab change
  useEffect(() => {
    if (!isMounted) return;

    // Set initial hidden state for step cards
    gsap.set(".step-card", { opacity: 0, y: 50 });

    // Create animation
    const ctx = gsap.context(() => {
      gsap.to(".step-card", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(0.4)",
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: false,
        },
      });
    }, sectionRef);

    // Force refresh ScrollTrigger after a small delay
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeTab, isMounted]);

  // Initial animation without scroll trigger (for immediate visibility)
  useEffect(() => {
    if (!isMounted) return;

    // If section is already visible on load, animate immediately
    const checkVisibility = () => {
      if (stepsContainerRef.current) {
        const rect = stepsContainerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          gsap.to(".step-card", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(0.4)",
          });
        }
      }
    };

    checkVisibility();
    
    // Also animate after a short delay to ensure everything is rendered
    const timer = setTimeout(() => {
      gsap.to(".step-card", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section className="w-full bg-gradient-to-br from-white via-emerald-50/30 to-white py-20 md:py-28 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 rounded-full mb-5">
              <Sparkles size={16} className="text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Start Your Journey With{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent italic">
                Safar
              </span>
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-white via-emerald-50/30 to-white py-20 md:py-28 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 rounded-full mb-5">
            <Sparkles size={16} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
              Simple Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Start Your Journey With{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent italic">
              Safar
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-500 text-lg leading-relaxed">
            Follow these simple steps to explore, book, and enjoy your next
            unforgettable adventure with Pakistan's most trusted travel
            platform.
          </p>
        </div>

        {/* Modern Toggle Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-1.5 flex gap-1 border border-white/50">
            <button
              onClick={() => setActiveTab("traveler")}
              className={`px-8 md:px-10 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "traveler"
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <Users size={18} />
              For Travelers
            </button>

            <button
              onClick={() => setActiveTab("company")}
              className={`px-8 md:px-10 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "company"
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <Building2 size={18} />
              For Companies
            </button>
          </div>
        </div>

        {/* Steps Grid with Connecting Line */}
        <div ref={stepsContainerRef} className="relative">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-0 right-0 top-[72px] h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent hidden lg:block" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 relative">
            {currentSteps.map((step, index) => (
              <div
                key={index}
                className="step-card flex flex-col items-center text-center relative group"
                style={{ opacity: 0, y: 50 }}
              >
                {/* Step Number Bubble - Centered perfectly over line */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 hidden lg:flex">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-emerald-400 shadow-md flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Icon Container */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-50 to-white shadow-md border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 group-hover:border-emerald-300">
                  {step.icon}
                </div>

                {/* Text Content */}
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {step.title}
                </h4>

                <p className="text-sm text-gray-500 leading-relaxed max-w-[180px] mx-auto">
                  {step.desc}
                </p>

                {/* Mobile step number */}
                <div className="lg:hidden mt-4 w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-500 mb-4">
            {activeTab === "traveler"
              ? "Ready to start your adventure?"
              : "Ready to grow your business?"}
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
            {activeTab === "traveler" ? "Explore Trips →" : "Join as Partner →"}
          </button>
        </div>
      </div>
    </section>
  );
}