// components/ProblemShowcase.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProblemShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const painPoints = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Social Media Discovery",
      description: "Travelers scroll through Instagram and Facebook pages with no way to verify whether the company is legitimate, licensed, or even active.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Negotiation in DMs",
      description: "Every booking starts with a back-and-forth in Instagram DMs or WhatsApp — no standard pricing, no written confirmation, and no protection.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "No Payment Protection",
      description: "Travelers transfer money blindly — advance payments with no receipts, no refund policy, and no recourse when something goes wrong.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: "No Verified Reviews",
      description: "Reviews live on social posts anyone can delete. There is no trust layer — no badges, no accountability, no ratings that can be relied on.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Fragmented Information",
      description: "Comparing tours means visiting a dozen pages, asking repeated questions, and still never knowing if you've found the best option or the right fit.",
    },
  ];

  const stats = [
    { value: "88%", label: "Lack trust in operators" },
    { value: "76%", label: "Book through DMs only" },
    { value: "82%", label: "Had payment issues" },
    { value: "94%", label: "Never received refund" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Header animation
        if (headerRef.current) {
          gsap.fromTo(headerRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
              },
            }
          );
        }

        // Timeline items animation
        if (timelineContainerRef.current) {
          const items = timelineContainerRef.current.querySelectorAll('.timeline-item');
          if (items.length > 0) {
            gsap.fromTo(items,
              { x: -20, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: timelineContainerRef.current,
                  start: "top 75%",
                },
              }
            );
          }
        }

        // Stats bars animation
        if (statsContainerRef.current) {
          const bars = statsContainerRef.current.querySelectorAll('.stat-bar');
          if (bars.length > 0) {
            gsap.fromTo(bars,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.inOut",
                transformOrigin: "left",
                scrollTrigger: {
                  trigger: statsContainerRef.current,
                  start: "top 85%",
                },
              }
            );
          }
        }

        // Testimonial animation
        if (testimonialRef.current) {
          gsap.fromTo(testimonialRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: testimonialRef.current,
                start: "top 90%",
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section className="relative w-full min-h-screen bg-white">
        <div className="absolute inset-0 bg-white" />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white overflow-hidden"
    >
      {/* Elegant background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-50/30 via-white to-white" />
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-linear-to-bl from-gray-100/20 to-transparent rounded-bl-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-emerald-50/10 to-transparent rounded-tr-[80px]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
            The Problem
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
            Planning a trip in Pakistan
            <br />
            <span className="relative">
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-400 italic font-bold font-playfair">
                is still broken.
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,4 Q50,0 100,4 Q150,8 200,4"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h2>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4 font-light">
            Despite the beauty and potential, travelers face a broken system at every step.
          </p>
        </div>

        {/* Timeline-style Pain Points */}
        <div ref={timelineContainerRef} className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-3 bottom-3 w-px bg-linear-to-b from-transparent via-gray-300 to-transparent" />

            {painPoints.map((point, index) => (
              <div
                key={index}
                className="timeline-item relative pl-12 md:pl-16 pb-8 last:pb-0"
              >
                <div className="absolute left-2.5 md:left-5.25 top-2 w-2.5 h-2.5 bg-white border border-gray-300 rounded-full ring-4 ring-gray-50/50" />

                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                      {point.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1.5 tracking-tight">
                        {point.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-light">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bars */}
        <div ref={statsContainerRef} className="max-w-3xl mx-auto mb-12">
          <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-6">
            Traveler Pain Points — Survey Data
          </p>
          <div className="space-y-5">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-light text-gray-600">
                    {stat.label}
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    {stat.value}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                      className="stat-bar h-full bg-linear-to-r from-gray-400 to-gray-500 rounded-full"
                      style={{ width: stat.value }}
                    />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div ref={testimonialRef} className="max-w-3xl mx-auto">
          <div className="relative bg-linear-to-br from-gray-50/80 via-white to-gray-50/80 rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="pl-4">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 font-light italic">
                "I paid the advance, they disappeared. There was no contract, no receipt, nowhere to complain."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                  FT
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Frustrated Traveler
                  </p>
                  <p className="text-xs text-gray-400 font-light">
                    Pakistan, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-gray-300/20 hidden lg:block" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-gray-300/20 hidden lg:block" />
    </section>
  );
}