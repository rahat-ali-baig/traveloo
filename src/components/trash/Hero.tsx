"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FULL_CLIP =
  "polygon(0% 0%, 33% 0%, 50% 0%, 67% 0%, 100% 0%, 100% 100%, 75% 100%, 25% 100%, 0% 100%, 0% 50%)";

const Y_CLIP = "polygon(0% 0%, 22% 0%, 50% 33%, 77% 0%, 96% 0%, 62% 45%, 62% 70%, 42% 70%, 42% 45%, 0% 0%)";

export default function HeroSection() {
  const vrRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ySlotRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const vfadeRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vr = vrRef.current;
    const ySlot = ySlotRef.current;
    const titleContainer = titleContainerRef.current;
    if (!vr || !ySlot || !titleContainer) return;

    const setVrSize = () => {
      gsap.set(vr, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        clipPath: FULL_CLIP,
      });
    };
    setVrSize();

    const getFinalYPosition = () => {
      const rect = ySlot.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      
      const pad = isMobile ? 0.02 : 0.01;
      const leftOffset = isMobile ? -0.02 : -0.03;
      const topOffset = isMobile ? -0.06 : -0.12;
      
      return {
        width: rect.width * (1 + pad * 2),
        height: rect.height * (1 + pad * 2),
        left: rect.left - rect.width * leftOffset,
        top: rect.top - rect.height * topOffset,
      };
    };

    gsap.to(bgRef.current, { opacity: 1, duration: 1.2, delay: 0.2 });
    gsap.to(scrollCueRef.current, { opacity: 1, duration: 0.8, delay: 0.6 });

    const isMobile = window.innerWidth < 768;
    const bigSize = Math.min(window.innerWidth, window.innerHeight) * (isMobile ? 0.9 : 0.8);
    const bigTop = (window.innerHeight - bigSize) / 2;
    const bigLeft = (window.innerWidth - bigSize) / 2;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-scroll",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.6,
        pin: "#stage",
        anticipatePin: 1,
      },
    });

    tl.to(
      vr,
      {
        clipPath: Y_CLIP,
        width: bigSize,
        height: bigSize,
        top: bigTop,
        left: bigLeft,
        ease: "power2.inOut",
        duration: 3,
      },
      0,
    )
      .to(scrollCueRef.current, { opacity: 0, duration: 1 }, 0)
      .to(vignetteRef.current, { opacity: 0, duration: 2 }, 0);

    const final = getFinalYPosition();
    tl.to(
      vr,
      {
        width: final.width,
        height: final.height,
        top: final.top,
        left: final.left,
        ease: "power3.inOut",
        duration: 5,
      },
      3,
    ).to(vfadeRef.current, { opacity: 1, duration: 2 }, 3);

    tl.to(
      lettersRef.current,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.26,
        duration: 1,
        ease: "expo.out",
      },
      8,
    );

    tl.to(taglineRef.current, { opacity: 1, duration: 1 }, 10);

    const handleResize = () => {
      setVrSize();
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setLetterRef = (el: HTMLSpanElement | null, i: number) => {
    lettersRef.current[i] = el;
  };

  return (
    <>
      <div id="hero-scroll" className="w-full overflow-hidden h-[600vh] relative">
        <div id="stage" className="relative w-screen h-screen overflow-hidden">
          {/* Clean background */}
          <div ref={bgRef} className="absolute inset-0 z-0 opacity-0" />

          {/* Scroll cue - hide on mobile */}
          <div
            ref={scrollCueRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 text-white text-[9px] font-bold tracking-[0.3em] uppercase opacity-0 select-none hidden md:flex"
          >
            <span>Scroll</span>
            <div className="w-px h-10 bg-white/35 relative overflow-hidden rounded-full">
              <div
                className="absolute left-0 w-full h-full bg-white"
                style={{
                  animation: "scrollLine 1.6s ease-in-out infinite",
                  top: "-100%",
                }}
              />
            </div>
          </div>

          {/* Video container */}
          <div
            ref={vrRef}
            id="vr"
            className="absolute z-10 overflow-hidden"
            style={{ willChange: "clip-path, width, height, top, left" }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://www.pexels.com/download/video/1409899/"
                type="video/mp4"
              />
            </video>

            <div
              ref={vignetteRef}
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.60) 100%)",
              }}
            />

            <div
              ref={vfadeRef}
              className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none z-20 opacity-0"
              style={{
                background: "linear-gradient(to bottom, transparent, #F7F3EE)",
              }}
            />
          </div>

          {/* Title: SAFARL + Y slot (invisible placeholder for positioning) */}
          <div
            ref={titleContainerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-30"
            style={{ gap: "clamp(-0.25em, -0.2em, -0.15em)" }}
          >
            {["S", "A", "F", "A", "R", "L"].map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => setLetterRef(el, idx)}
                className="text-[clamp(40px,7.5vw,132px)] md:text-[clamp(52px,7.5vw,132px)] font-black leading-none tracking-[-0.02em] inline-block opacity-0"
                style={{
                  transform: "translateY(64px) rotateX(-42deg)",
                  color: "#1A1208",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {letter}
              </span>
            ))}

            {/* Invisible Y slot for positioning only */}
            <span
              ref={ySlotRef}
              id="y-slot"
              className="text-[clamp(40px,7.5vw,132px)] md:text-[clamp(52px,7.5vw,132px)] font-black leading-none tracking-[-0.02em] inline-block"
              style={{
                color: "transparent",
                fontFamily: "'DM Sans', sans-serif",
                visibility: "hidden",
                marginLeft: "clamp(-0.25em, -0.2em, -0.15em)",
              }}
              aria-hidden="true"
            >
              Y
            </span>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="absolute z-30 whitespace-nowrap font-medium tracking-[0.40em] uppercase opacity-0 text-center"
            style={{
              color: "#8C7B6E",
              fontSize: "clamp(7px, 0.95vw, 12px)",
              top: "calc(50% + clamp(35px, 5.5vw, 80px) + 20px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: "90vw",
            }}
          >
            The World is Waiting for You
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;900&display=swap");

        @keyframes scrollLine {
          0% {
            top: -100%;
          }
          100% {
            top: 200%;
          }
        }

        #vr {
          will-change: clip-path, transform, opacity;
        }
        
        @media (max-width: 768px) {
          #hero-scroll {
            height: 500vh !important;
          }
        }
        
        @media (max-width: 480px) {
          #hero-scroll {
            height: 400vh !important;
          }
        }
      `}</style>
    </>
  );
}


// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function HeroSection() {
//   const vrRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const yClipRef = useRef<SVGTextElement>(null);
//   const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
//   const yTextRef = useRef<HTMLSpanElement>(null);
//   const taglineRef = useRef<HTMLDivElement>(null);
//   const scrollCueRef = useRef<HTMLDivElement>(null);
//   const brandRef = useRef<HTMLDivElement>(null);
//   const bgRef = useRef<HTMLDivElement>(null);
//   const headerBgRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const vr = vrRef.current;
//     const yClip = yClipRef.current;
//     const yText = yTextRef.current;

//     if (!vr || !yClip || !yText) return;

//     let isAnimating = true;

//     // Force DM Sans to load before calculating positions
//     const initAnimation = async () => {
//       await document.fonts.load("900 1em 'DM Sans'");
//       if (!isAnimating) return;

//       // Initial states
//       gsap.set(brandRef.current, { xPercent: -50, yPercent: -50 });
//       gsap.set(lettersRef.current, { y: 64, rotateX: -42, opacity: 0 });
//       gsap.set(yTextRef.current, { opacity: 0 });
//       gsap.set(headerBgRef.current, { opacity: 0 });

//       // Start with NO clip path - video is fullscreen
//       gsap.set(vr, {
//         opacity: 1,
//         clipPath: "none",
//         WebkitClipPath: "none"
//       });

//       // Initial Y clip position (will be used when scroll starts)
//       const initialFontSize = Math.min(window.innerWidth, window.innerHeight) * 0.85;
//       const initialX = window.innerWidth / 2;
//       const initialY = window.innerHeight / 2 + initialFontSize * 0.36;

//       gsap.set(yClip, {
//         attr: { x: initialX, y: initialY },
//         fontSize: initialFontSize
//       });

//       // Fade in background and scroll cue
//       gsap.to(bgRef.current, { opacity: 1, duration: 1.2, delay: 0.2 });
//       gsap.to(scrollCueRef.current, { opacity: 1, duration: 0.8, delay: 0.6 });

//       // Get final position where Y text will be
//       const getFinalClipPosition = () => {
//         const rect = yText.getBoundingClientRect();
//         return {
//           fontSize: rect.height,
//           x: rect.left + rect.width / 2,
//           y: rect.top + rect.height * 0.82,
//         };
//       };

//       const finalPos = getFinalClipPosition();

//       // Main scroll timeline
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: "#hero-scroll",
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 1.2,
//           pin: "#stage",
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//           onUpdate: (self) => {
//             // Apply clip path only after scroll starts (progress > 0)
//             if (self.progress > 0.01 && vr.style.clipPath !== "url(#y-letter-clip)") {
//               gsap.set(vr, {
//                 clipPath: "url(#y-letter-clip)",
//                 WebkitClipPath: "url(#y-letter-clip)"
//               });
//             }
//           }
//         },
//       });

//       // Phase 1: Apply Y clip and morph to final position
//       tl.to(yClip, {
//         attr: { x: finalPos.x, y: finalPos.y },
//         fontSize: finalPos.fontSize,
//         ease: "power2.inOut",
//         duration: 6,
//       }, 0)
//       .to(scrollCueRef.current, {
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.out"
//       }, 0);

//       // Phase 2: SAFARL letters animate in with staggered reveal
//       tl.to(lettersRef.current, {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         stagger: 0.08,
//         duration: 0.8,
//         ease: "back.out(0.7)",
//       }, 5.5);

//       // Phase 3: Seamless swap - video Y fades out, text Y fades in at exact same position
//       tl.to(vr, {
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.inOut",
//       }, 7.2)
//       .to(yTextRef.current, {
//         opacity: 1,
//         duration: 0.6,
//         ease: "power2.out",
//       }, 7.2)
//       .to(taglineRef.current, {
//         opacity: 1,
//         duration: 0.6,
//         ease: "power2.out",
//       }, 7.5);

//       // Phase 4: Complete SAFARLY moves to top as fixed header
//       tl.to(taglineRef.current, {
//         opacity: 0,
//         duration: 0.4,
//         ease: "power2.in",
//       }, 9.5)
//       .to(brandRef.current, {
//         top: "32px",
//         yPercent: 0,
//         scale: 0.28,
//         ease: "power3.inOut",
//         duration: 1.2,
//       }, 9.5)
//       .to(headerBgRef.current, {
//         opacity: 1,
//         duration: 0.6,
//         ease: "power2.out",
//       }, 9.8);

//       // Handle resize
//       const handleResize = () => {
//         if (!isAnimating) return;
//         ScrollTrigger.refresh();

//         // Update final position dynamically
//         const newFinalPos = getFinalClipPosition();
//         if (tl.progress() < 0.6) {
//           tl.invalidate();
//         }
//       };

//       window.addEventListener("resize", handleResize);

//       // Cleanup function
//       return () => {
//         window.removeEventListener("resize", handleResize);
//         if (tl.scrollTrigger) {
//           tl.scrollTrigger.kill();
//         }
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     };

//     initAnimation();

//     return () => {
//       isAnimating = false;
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   const setLetterRef = (el: HTMLSpanElement | null, i: number) => {
//     lettersRef.current[i] = el;
//   };

//   return (
//     <>
//       <div id="hero-scroll" className="w-full overflow-hidden h-[500vh] relative">
//         <div
//           id="stage"
//           className="relative w-screen h-screen overflow-hidden"
//           style={{ background: "#F7F3EE" }}
//         >
//           {/* Background layer */}
//           <div
//             ref={bgRef}
//             className="absolute inset-0 z-0 opacity-0"
//             style={{ background: "#F7F3EE" }}
//           />

//           {/* SVG ClipPath definition for Y shape */}
//           <svg
//             aria-hidden="true"
//             style={{
//               position: "absolute",
//               width: 0,
//               height: 0,
//               overflow: "hidden"
//             }}
//           >
//             <defs>
//               <clipPath id="y-letter-clip" clipPathUnits="userSpaceOnUse">
//                 <text
//                   ref={yClipRef}
//                   fontFamily="'DM Sans', sans-serif"
//                   fontWeight="900"
//                   textAnchor="middle"
//                   fontSize="0"
//                   x="0"
//                   y="0"
//                 >
//                   Y
//                 </text>
//               </clipPath>
//             </defs>
//           </svg>

//           {/* Frosted header bar - becomes visible when logo moves to top */}
//           <div
//             ref={headerBgRef}
//             className="absolute top-0 left-0 right-0 z-20 opacity-0"
//             style={{
//               height: "64px",
//               background: "rgba(247, 243, 238, 0.95)",
//               backdropFilter: "blur(16px)",
//               WebkitBackdropFilter: "blur(16px)",
//               borderBottom: "1px solid rgba(26, 18, 8, 0.06)",
//               boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
//             }}
//           />

//           {/* Scroll indicator cue */}
//           <div
//             ref={scrollCueRef}
//             className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase opacity-0 select-none"
//             style={{ color: "#1A1208" }}
//           >
//             <span>Scroll</span>
//             <div className="w-px h-12 relative overflow-hidden rounded-full" style={{ background: "rgba(26, 18, 8, 0.15)" }}>
//               <div
//                 className="absolute left-0 w-full"
//                 style={{
//                   background: "#1A1208",
//                   height: "40%",
//                   animation: "scrollLine 1.8s ease-in-out infinite",
//                   top: "-40%",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Video container - starts fullscreen, gets Y-shaped clip on scroll */}
//           <div
//             ref={vrRef}
//             className="absolute inset-0 z-10"
//             style={{
//               willChange: "opacity, clip-path",
//             }}
//           >
//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover"
//             >
//               <source src="https://www.pexels.com/download/video/1409899/" type="video/mp4" />
//             </video>
//           </div>

//           {/* Brand wordmark: SAFARLY - positioned at center initially */}
//           <div
//             ref={brandRef}
//             className="absolute flex items-center z-30 pointer-events-none"
//             style={{
//               top: "50%",
//               left: "50%",
//               gap: "0.02em",
//               transformOrigin: "center center",
//               willChange: "transform, top"
//             }}
//           >
//             {/* S A F A R L letters - will animate in */}
//             {["S", "A", "F", "A", "R", "L"].map((letter, idx) => (
//               <span
//                 key={idx}
//                 ref={(el) => setLetterRef(el, idx)}
//                 className="text-[clamp(52px,7.5vw,132px)] font-black leading-[1] tracking-[-0.02em] inline-block"
//                 style={{
//                   color: "#1A1208",
//                   fontFamily: "'DM Sans', sans-serif",
//                   opacity: 0,
//                   transform: "translateY(64px) rotateX(-42deg)",
//                   willChange: "transform, opacity",
//                 }}
//               >
//                 {letter}
//               </span>
//             ))}

//             {/* Y letter - starts invisible, will fade in exactly where video Y was */}
//             <span
//               ref={yTextRef}
//               className="text-[clamp(52px,7.5vw,132px)] font-black leading-[1] tracking-[-0.02em] inline-block"
//               style={{
//                 color: "#1A1208",
//                 fontFamily: "'DM Sans', sans-serif",
//                 opacity: 0,
//                 willChange: "opacity",
//               }}
//             >
//               Y
//             </span>
//           </div>

//           {/* Tagline that appears after Y swap */}
//           <div
//             ref={taglineRef}
//             className="absolute z-30 whitespace-nowrap font-medium tracking-[0.4em] uppercase opacity-0"
//             style={{
//               color: "#8C7B6E",
//               fontSize: "clamp(10px, 0.9vw, 13px)",
//               letterSpacing: "0.4em",
//               top: "calc(50% + clamp(45px, 6vw, 90px) + 15px)",
//               left: "50%",
//               transform: "translateX(-50%)",
//               fontFamily: "'DM Sans', sans-serif",
//               willChange: "opacity",
//             }}
//           >
//             THE WORLD IS WAITING FOR YOU
//           </div>
//         </div>
//       </div>

//       {/* Demo content below to show header stays fixed */}
//       <div className="relative z-10" style={{ background: "#F7F3EE" }}>
//         <div className="h-screen flex items-center justify-center border-t border-gray-200">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">Continue Scrolling</h2>
//             <p className="text-gray-600">The SAFARLY logo stays fixed at the top</p>
//           </div>
//         </div>
//         <div className="h-screen flex items-center justify-center border-t border-gray-200">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">More Content</h2>
//             <p className="text-gray-600">Header remains visible with frosted glass effect</p>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');

//         @keyframes scrollLine {
//           0% {
//             top: -40%;
//           }
//           100% {
//             top: 140%;
//           }
//         }

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           overflow-x: hidden;
//         }

//         #stage {
//           position: relative;
//         }

//         /* Smooth rendering for transforms */
//         .brand-letter {
//           backface-visibility: hidden;
//           -webkit-font-smoothing: antialiased;
//         }
//       `}</style>
//     </>
//   );
// }
