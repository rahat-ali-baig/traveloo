"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dreamTextRef = useRef<HTMLParagraphElement>(null);
  const safarlyContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      const safarlyElement = safarlyContainerRef.current?.querySelector("h2");

      if (safarlyElement) {
        const text = safarlyElement.textContent || "";
        safarlyElement.textContent = "";

        // Create span for each letter with initial hidden state
        const letters = text.split("").map((letter) => {
          const span = document.createElement("span");
          span.textContent = letter;
          span.style.display = "inline-block";
          span.style.color = "transparent";
          span.style.webkitTextStroke = "1px";
          span.style.webkitTextStrokeColor = "#a8d4c0";
          span.style.textShadow = "2px 2px 12px rgba(168, 212, 192, 0.1)";
          span.style.fontWeight = "900";
          span.style.textTransform = "uppercase";
          span.style.opacity = "0";
          span.style.transform = "translateY(50px) rotateX(-90deg)";
          safarlyElement.appendChild(span);
          return span;
        });

        // Set initial states with GSAP (prevents flash)
        gsap.set(dreamTextRef.current, {
          opacity: 0,
          y: 20,
        });

        gsap.set(descriptionRef.current, {
          opacity: 0,
          y: 20,
        });

        gsap.set(ctaRef.current, {
          opacity: 0,
          y: 20,
        });

        // Small delay to ensure everything is set
        gsap.delayedCall(0.05, () => {
          const tl = gsap.timeline({
            defaults: {
              duration: 0.5,
              ease: "power3.out",
            },
          });

          tl.to(dreamTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
          })
            .to(
              letters,
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.35,
                stagger: {
                  amount: 0.3,
                  from: "start",
                },
                ease: "back.out(1.2)",
              },
              "-=0.1",
            )
            .to(
              descriptionRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
              },
              "-=0.2",
            )
            .to(
              ctaRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
              },
              "-=0.15",
            );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Hide content until mounted to prevent flash
  if (!isMounted) {
    return (
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-white" />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Elegant background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50/30 via-white to-white" />
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-linear-to-bl from-emerald-100/15 to-transparent rounded-bl-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-emerald-50/20 to-transparent rounded-tr-[80px]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(#7eb89a 1px, transparent 1px), linear-gradient(90deg, #7eb89a 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Left Lottie Animation */}
      <div className="absolute top-3 left-3 md:top-10 md:left-10 z-30 w-60 h-60 md:w-96 md:h-96 filter grayscale opacity-40">
        <DotLottieReact
          src="https://lottie.host/72522217-2948-4e2e-8ea6-255f17c3c5a8/fQGxnZLsbA.lottie"
          loop={false}
          autoplay={true}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Right Lottie Animation */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 w-80 h-80 md:w-120 md:h-120 filter grayscale opacity-20">
        <DotLottieReact
          src="https://lottie.host/0d9a7f3a-fef1-4362-aef7-2d9731a7847b/zu1YzrfIB0.lottie"
          loop={false}
          autoplay={true}
          className="w-full h-full"
        />
      </div>

      {/* Main Content - Left Aligned */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        {/* Dream Journey with - Initially hidden */}
        <p
          ref={dreamTextRef}
          className="text-xl md:text-2xl font-medium tracking-wide mb-2 text-gray-800"
          style={{ opacity: 0 }}
        >
          Dream Journey with
        </p>

        {/* SAFARLY - Letter by letter animation */}
        <div ref={safarlyContainerRef} className="relative mb-8">
          <h2 className="font-black uppercase tracking-tight leading-none text-[clamp(4rem,15vw,12rem)] w-full whitespace-nowrap">
            SAFARLY
          </h2>

          {/* Bottom fade-out overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, white 70%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Description - Initially hidden */}
        <p
          ref={descriptionRef}
          className="max-w-xl text-base md:text-lg text-gray-600 leading-relaxed py-1"
          style={{ opacity: 0 }}
        >
          Embark on unforgettable adventures with SAFARLY. From hidden gems to
          iconic landmarks, we craft personalized travel experiences that turn
          dreams into cherished memories.
        </p>

        {/* CTA Buttons - Initially hidden */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-4 mt-8"
          style={{ opacity: 0 }}
        >
          <button className="px-7 py-3 cursor-pointer bg-emerald-700 text-white font-medium rounded-sm hover:bg-emerald-800 transition-all duration-300 shadow-sm hover:shadow-md uppercase tracking-wider text-xs">
            Start Exploring
          </button>
          <button className="px-7 py-3 cursor-pointer bg-transparent text-emerald-700 font-medium rounded-sm border border-emerald-400 hover:bg-emerald-50 transition-all duration-300 uppercase tracking-wider text-xs">
            View Journeys
          </button>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-emerald-300/30 hidden lg:block" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-emerald-300/30 hidden lg:block" />
    </section>
  );
}