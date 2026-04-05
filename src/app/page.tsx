"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const vrRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const oSlotRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const vfadeRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // Loader dismissal with minimum display time
  useEffect(() => {
    const MIN_LOAD_MS = 2600;
    const startTime = Date.now();

    const dismissLoader = () => {
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, MIN_LOAD_MS - elapsed);
      setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.classList.add("exit");
          loaderRef.current.addEventListener(
            "animationend",
            () => {
              setLoaderComplete(true);
            },
            { once: true }
          );
        }
      }, wait);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("canplay", dismissLoader, { once: true });
    }
    const timeout = setTimeout(dismissLoader, 4000);
    return () => clearTimeout(timeout);
  }, []);

  // Hero scroll animation
  useEffect(() => {
    if (!loaderComplete) return;

    const vr = vrRef.current;
    const oSlot = oSlotRef.current;
    if (!vr || !oSlot) return;

    // Initial fullscreen setup
    const setVrSize = () => {
      gsap.set(vr, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
      });
    };
    setVrSize();

    // Calculate final O position
    const getFinalPosition = () => {
      const rect = oSlot.getBoundingClientRect();
      const oW = rect.width;
      const oH = rect.height;
      const oSize = Math.max(oW, oH);
      return {
        size: oSize,
        left: rect.left + (oW - oSize) / 2,
        top: rect.top + (oH - oSize) / 2,
      };
    };

    // Show scroll cue
    gsap.to(scrollCueRef.current, { opacity: 1, duration: 0.8, delay: 0.3 });

    const bigSize = Math.min(window.innerWidth, window.innerHeight) * 0.88;
    const bigTop = window.innerHeight / 2 - bigSize / 2;
    const bigLeft = window.innerWidth / 2 - bigSize / 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-scroll",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
        pin: "#stage",
        anticipatePin: 1,
      },
    });

    // Phase 1: Fullscreen to big circle
    tl.to(vr, {
      borderRadius: "50%",
      width: bigSize,
      height: bigSize,
      top: bigTop,
      left: bigLeft,
      ease: "power2.inOut",
      duration: 3,
    }, 0)
      .to(scrollCueRef.current, { opacity: 0, duration: 1 }, 0)
      .to(vignetteRef.current, { opacity: 0, duration: 2 }, 0);

    // Phase 2: Big circle to O slot (final size 40x40px)
    const final = getFinalPosition();
    tl.to(vr, {
      width: 100,
      height: 100,
      top: final.top + (final.size / 2) - 40,
      left: final.left + (final.size / 2) - 40,
      ease: "power3.inOut",
      duration: 5,
    }, 3)
      .to(vfadeRef.current, { opacity: 1, duration: 2 }, 3);

    // Phase 3: Reveal letters
    tl.to(lettersRef.current, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.3,
      duration: 1,
      ease: "expo.out",
    }, 8);

    // Phase 4: Reveal tagline - no border on video ring
    tl.to(taglineRef.current, { opacity: 1, duration: 1 }, 10)
      .to(vr, {
        boxShadow: "none",
        duration: 0.8,
      }, 10);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
      setVrSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, [loaderComplete]);

  const setLetterRef = (el: HTMLSpanElement | null, index: number) => {
    lettersRef.current[index] = el;
  };

  if (!loaderComplete) {
    return (
      <div
        ref={loaderRef}
        id="global-loader"
        className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
      >
        <div className="relative w-[360px] h-[140px]">
          {/* Sky with clouds */}
          <div className="absolute top-0 left-0 w-full h-[95px] bg-gradient-to-b from-blue-100 to-blue-50 rounded-t-xl overflow-hidden">
            <svg
              className="absolute top-3 left-5 w-[72px] h-[26px] animate-cloud-drift"
              viewBox="0 0 72 26"
              fill="none"
            >
              <ellipse cx="36" cy="18" rx="36" ry="8" fill="white" />
              <ellipse cx="22" cy="16" rx="16" ry="10" fill="white" />
              <ellipse cx="50" cy="15" rx="14" ry="9" fill="white" />
              <ellipse cx="36" cy="11" rx="18" ry="10" fill="white" />
            </svg>
            <svg
              className="absolute top-5 left-[160px] w-[54px] h-[20px] animate-cloud-drift-reverse"
              viewBox="0 0 54 20"
              fill="none"
            >
              <ellipse cx="27" cy="14" rx="27" ry="6" fill="white" opacity="0.9" />
              <ellipse cx="18" cy="12" rx="13" ry="8" fill="white" opacity="0.9" />
              <ellipse cx="38" cy="11" rx="11" ry="7" fill="white" opacity="0.9" />
            </svg>
            <svg
              className="absolute top-2 right-5 w-[48px] h-[18px] animate-cloud-drift"
              viewBox="0 0 48 18"
              fill="none"
            >
              <ellipse cx="24" cy="12" rx="24" ry="6" fill="white" opacity="0.8" />
              <ellipse cx="15" cy="10" rx="11" ry="7" fill="white" opacity="0.8" />
              <ellipse cx="34" cy="9" rx="10" ry="6" fill="white" opacity="0.8" />
            </svg>
          </div>

          {/* Bus */}
          <div className="absolute bottom-[38px] left-1/2 -translate-x-1/2 animate-bus-bounce">
            <svg width="210" height="70" viewBox="0 0 210 70" fill="none">
              <ellipse cx="105" cy="66" rx="88" ry="5" fill="rgba(0,0,0,0.12)" />
              <rect x="8" y="8" width="186" height="52" rx="10" fill="#1d4ed8" />
              <rect x="8" y="8" width="186" height="16" rx="10" fill="#2563eb" />
              <rect x="8" y="20" width="186" height="4" fill="#1d4ed8" />
              <rect x="8" y="36" width="186" height="5" fill="white" opacity="0.15" />
              <rect x="20" y="14" width="26" height="18" rx="4" fill="#93c5fd" opacity="0.9" />
              <rect x="52" y="14" width="26" height="18" rx="4" fill="#93c5fd" opacity="0.9" />
              <rect x="84" y="14" width="26" height="18" rx="4" fill="#bfdbfe" opacity="0.85" />
              <rect x="116" y="14" width="26" height="18" rx="4" fill="#93c5fd" opacity="0.9" />
              <rect x="21" y="15" width="8" height="5" rx="2" fill="white" opacity="0.4" />
              <rect x="53" y="15" width="8" height="5" rx="2" fill="white" opacity="0.4" />
              <rect x="150" y="14" width="22" height="28" rx="4" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="161" y1="14" x2="161" y2="42" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
              <circle cx="171" cy="28" r="2" fill="#93c5fd" />
              <rect x="174" y="12" width="16" height="26" rx="5" fill="#bfdbfe" opacity="0.85" />
              <rect x="176" y="14" width="6" height="8" rx="2" fill="white" opacity="0.5" />
              <rect x="192" y="18" width="8" height="5" rx="2" fill="#fef3c7" />
              <rect x="192" y="26" width="8" height="5" rx="2" fill="#fef9c3" opacity="0.7" />
              <rect x="192" y="46" width="10" height="6" rx="2" fill="#1e40af" />
              <rect x="8" y="46" width="10" height="6" rx="2" fill="#1e40af" />
              <rect x="18" y="52" width="170" height="6" rx="2" fill="#1e3a8a" />
              <text x="64" y="33" fontFamily="Montserrat,sans-serif" fontSize="9" fontWeight="700" fill="white" opacity="0.9" letterSpacing="2">
                TRAVELOO
              </text>
              {/* Left Wheel */}
              <g transform="translate(48,58)">
                <circle r="14" fill="#111827" />
                <circle r="9" fill="#374151" />
                <circle r="5" fill="#4b5563" />
                <g className="animate-wheel-spin">
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#6b7280" strokeWidth="2" />
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="#6b7280" strokeWidth="2" />
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke="#6b7280" strokeWidth="1.5" />
                  <line x1="6" y1="-6" x2="-6" y2="6" stroke="#6b7280" strokeWidth="1.5" />
                </g>
                <circle r="3" fill="#9ca3af" />
              </g>
              {/* Right Wheel */}
              <g transform="translate(160,58)">
                <circle r="14" fill="#111827" />
                <circle r="9" fill="#374151" />
                <circle r="5" fill="#4b5563" />
                <g className="animate-wheel-spin">
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#6b7280" strokeWidth="2" />
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="#6b7280" strokeWidth="2" />
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke="#6b7280" strokeWidth="1.5" />
                  <line x1="6" y1="-6" x2="-6" y2="6" stroke="#6b7280" strokeWidth="1.5" />
                </g>
                <circle r="3" fill="#9ca3af" />
              </g>
            </svg>
          </div>

          {/* Road */}
          <div className="absolute bottom-0 left-0 w-full h-[45px] bg-gray-700 rounded-b-xl overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 flex gap-6 animate-road-scroll whitespace-nowrap">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-12 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                ))}
            </div>
          </div>
        </div>

        <div className="mt-7 text-[11px] font-bold tracking-[0.28em] uppercase text-gray-400 flex gap-1 items-center">
          Loading your journey
          <span className="inline-block w-1 h-1 bg-gray-300 rounded-full animate-dot-pop ml-1" />
          <span className="inline-block w-1 h-1 bg-gray-300 rounded-full animate-dot-pop" style={{ animationDelay: "0.18s" }} />
          <span className="inline-block w-1 h-1 bg-gray-300 rounded-full animate-dot-pop" style={{ animationDelay: "0.36s" }} />
        </div>

        <style jsx>{`
          @keyframes cloudDrift {
            0% { transform: translateX(0); }
            100% { transform: translateX(12px); }
          }
          @keyframes roadScroll {
            0% { transform: translateY(-50%) translateX(0); }
            100% { transform: translateY(-50%) translateX(-96px); }
          }
          @keyframes busBounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-5px); }
          }
          @keyframes wheelSpin {
            100% { transform: rotate(360deg); }
          }
          @keyframes dotPop {
            0%, 100% { opacity: 0.3; transform: scale(0.7); }
            50% { opacity: 1; transform: scale(1); }
          }
          .animate-cloud-drift { animation: cloudDrift 4s ease-in-out infinite alternate; }
          .animate-cloud-drift-reverse { animation: cloudDrift 5s ease-in-out infinite alternate-reverse; }
          .animate-road-scroll { animation: roadScroll 0.55s linear infinite; }
          .animate-bus-bounce { animation: busBounce 0.85s ease-in-out infinite; }
          .animate-wheel-spin { animation: wheelSpin 0.45s linear infinite; }
          .animate-dot-pop { animation: dotPop 1.1s ease-in-out infinite; }
          #global-loader.exit {
            animation: loaderWipe 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          }
          @keyframes loaderWipe {
            0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
            60% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
            100% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); opacity: 0; pointer-events: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="w-full overflow-y-auto relative">
      {/* Hero Scroll Section */}
      <div id="hero-scroll" className="w-full overflow-hidden h-[500vh] relative">
        <div id="stage" className="relative w-screen h-screen overflow-hidden bg-white">
          {/* Scroll Cue */}
          <div
            ref={scrollCueRef}
            className="absolute bottom-11 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 text-white text-[10px] font-bold tracking-[0.28em] uppercase opacity-0"
          >
            <span>Scroll</span>
            <div className="w-px h-11 bg-white/40 relative overflow-hidden">
              <div className="absolute -top-full left-0 w-full h-full bg-white animate-scroll-line" />
            </div>
          </div>

          {/* Video Ring */}
          <div
            ref={vrRef}
            id="vr"
            className="absolute z-10 overflow-hidden"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.pexels.com/download/video/4305167/" type="video/mp4" />
            </video>
            <div
              ref={vignetteRef}
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] z-10"
            />
            <div
              ref={vfadeRef}
              className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent to-white pointer-events-none z-20 opacity-0"
            />
          </div>

          {/* Brand Name */}
          <div
            ref={brandRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-30 pointer-events-none whitespace-nowrap"
          >
            {["T", "R", "A", "V", "E", "L", "O"].map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => setLetterRef(el, idx)}
                className="bl text-[clamp(48px,7.5vw,128px)] font-black text-gray-900 leading-none tracking-[-0.04em] inline-block opacity-0 translate-y-[60px] [transform:rotateX(-40deg)]"
              >
                {letter}
              </span>
            ))}
            <span
              ref={oSlotRef}
              id="o-slot"
              className="text-[clamp(48px,7.5vw,128px)] font-black leading-none tracking-[-0.04em] text-transparent invisible"
            >
              O
            </span>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="absolute z-30 whitespace-nowrap text-[clamp(10px,1.1vw,14px)] font-semibold tracking-[0.35em] uppercase text-gray-500 opacity-0"
            style={{
              top: "calc(50% + clamp(36px, 5vw, 72px) + 24px)",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            The World is Waiting
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full bg-white relative z-20">
        {/* Hero Tagline */}
        <div className="text-center py-32 px-6">
          <h2 className="text-3xl md:text-6xl font-light text-gray-900 leading-tight tracking-tight">
            Every destination tells<br />
            <strong className="font-black">a story worth living.</strong>
          </h2>
          <p className="mt-5 text-sm text-gray-400 font-semibold tracking-wide">
            Curated journeys crafted for the curious traveller
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-2 px-10 py-4 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-gray-800 transition-colors group"
          >
            Explore Destinations
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Maldives */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-to-br from-sky-500 to-teal-800" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 p-7 z-20 text-white">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">South Asia</div>
              <div className="text-3xl font-black leading-tight tracking-tight mt-1">Maldives</div>
              <div className="text-xs opacity-65 mt-1.5">Crystal waters, infinite sky</div>
            </div>
          </motion.div>

          {/* Sahara */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 p-7 z-20 text-white">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Africa</div>
              <div className="text-3xl font-black leading-tight tracking-tight mt-1">Sahara</div>
              <div className="text-xs opacity-65 mt-1.5">Where silence roars</div>
            </div>
          </motion.div>

          {/* Patagonia */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 p-7 z-20 text-white">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">South America</div>
              <div className="text-3xl font-black leading-tight tracking-tight mt-1">Patagonia</div>
              <div className="text-xs opacity-65 mt-1.5">Wild beyond imagination</div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-100">
          {[
            ["140+", "Countries"],
            ["12k", "Journeys Crafted"],
            ["98%", "Happy Travellers"],
            ["24/7", "Travel Support"],
          ].map(([num, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="py-12 px-4 text-center border-r last:border-r-0 border-gray-100"
            >
              <div className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">{num}</div>
              <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 mt-1.5">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="w-full bg-black py-28 px-6 text-center">
          <h2 className="text-4xl md:text-8xl font-black text-white leading-none tracking-tighter">
            Your next<br />adventure starts<br />
            <em className="not-italic text-teal-100">right now.</em>
          </h2>
          <p className="mt-5 text-sm text-white/30 tracking-wider">Join 12,000+ travellers who chose Traveloo</p>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-block px-14 py-5 bg-white text-black text-[11px] font-extrabold tracking-[0.25em] uppercase rounded-sm transition-all"
          >
            Start Planning
          </motion.button>
        </div>

        {/* Footer */}
        <footer className="w-full py-10 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 gap-4">
          <div className="text-xl font-black tracking-tighter">Traveloo</div>
          <div className="flex gap-8">
            {["Destinations", "Experiences", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-bold tracking-[0.12em] uppercase text-gray-400 hover:text-black transition"
              >
                {item}
              </a>
            ))}
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes scrollLine {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        .animate-scroll-line {
          animation: scrollLine 1.5s ease-in-out infinite;
        }
        .bl {
          transition: none;
        }
      `}</style>
    </main>
  );
}