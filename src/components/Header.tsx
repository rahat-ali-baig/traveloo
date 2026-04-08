"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Header() {
  const underlineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return;

    // Only underline animation on initial load
    gsap.to(underline, {
      width: "clamp(1.5rem, 8vw, 3rem)",
      duration: 1.2,
      delay: 0.5,
      ease: "power2.out",
    });

    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled 
          ? "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.92) 100%)"
          : "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.03)" : "none",
      }}
    >
      {/* Logo container */}
      <div className="relative flex justify-center items-center min-h-[clamp(56px,10vh,72px)] px-4">
        <div className="relative">
          {/* Main logo text - responsive sizing */}
          <div className="flex items-center gap-0 px-3 sm:px-4 md:px-6 py-2">
            {["S", "A", "F", "A", "R", "L", "Y"].map((letter, idx) => (
              <span
                key={idx}
                className="font-bold tracking-tight transition-all duration-300"
                style={{
                  fontFamily: "'Inter', 'DM Sans', sans-serif",
                  color: "#000000",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(1.25rem, 5vw, 2.25rem)",
                  opacity: scrolled ? 0.85 : 1,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* Elegant underline - fully responsive */}
          <div
            ref={underlineRef}
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-black/40 to-transparent"
            style={{
              width: "clamp(1.5rem, 8vw, 3rem)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </header>
  );
}