'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const DoorwayReveal: React.FC = () => {
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const lightBeamRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Kill any existing animations
    gsap.killTweensOf([
      doorLeftRef.current,
      doorRightRef.current,
      lightBeamRef.current,
      textRef.current,
      glowRef.current,
      dustRef.current
    ]);

    // Initial states
    gsap.set(doorLeftRef.current, { x: 0 });
    gsap.set(doorRightRef.current, { x: 0 });
    gsap.set(lightBeamRef.current, { opacity: 0, scaleY: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 50, scale: 0.8 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0 });
    gsap.set(dustRef.current, { opacity: 0 });

    // Main timeline
    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true)
    });

    // Wait a moment, then doors start opening
    tl.to({}, { duration: 0.8 })
      // Doors swinging open
      .to(doorLeftRef.current, {
        x: '-50%',
        rotation: -15,
        duration: 1.5,
        ease: 'back.out(0.7)',
      }, 0)
      .to(doorRightRef.current, {
        x: '50%',
        rotation: 15,
        duration: 1.5,
        ease: 'back.out(0.7)',
      }, 0)
      
      // Light beam bursts through
      .to(lightBeamRef.current, {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 1.2)
      
      // Light glow expands
      .to(glowRef.current, {
        opacity: 0.6,
        scale: 1.5,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      }, 1.3)
      
      // Dust particles start floating
      .to(dustRef.current, {
        opacity: 0.8,
        duration: 0.6,
      }, 1.4)
      
      // Text animation - dramatic entrance
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.2)',
      }, 1.8)
      
      // Text glow pulse
      .to(textRef.current, {
        textShadow: '0 0 20px rgba(255, 200, 50, 0.8), 0 0 40px rgba(255, 100, 0, 0.5)',
        duration: 0.5,
        repeat: 3,
        yoyo: true,
        ease: 'power1.inOut',
      }, 2.3)
      
      // Continuous light flicker
      .to(lightBeamRef.current, {
        opacity: 0.9,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      }, 2.5);

    // Animate dust particles continuously
    const animateDust = () => {
      if (dustRef.current) {
        gsap.to(dustRef.current, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });
        gsap.to(dustRef.current, {
          opacity: 0.9,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };

    // Start dust animation after beam appears
    setTimeout(animateDust, 1500);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background - deep dark with slight gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      {/* Subtle floor reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-yellow-900/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Light Beam Effect */}
      <div
        ref={lightBeamRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom pointer-events-none"
        style={{
          width: '400px',
          height: '500px',
          background: 'linear-gradient(180deg, rgba(255, 200, 50, 0) 0%, rgba(255, 200, 50, 0.3) 30%, rgba(255, 100, 0, 0.6) 70%, rgba(255, 200, 50, 0.8) 100%)',
          filter: 'blur(20px)',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        }}
      />
      
      {/* Bright core of the light beam */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom pointer-events-none"
        style={{
          width: '150px',
          height: '300px',
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 200, 0.9), rgba(255, 150, 0, 0.4), transparent)',
          filter: 'blur(10px)',
        }}
      />
      
      {/* Glow on floor where light hits */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none rounded-full"
        style={{
          width: '300px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(255, 200, 50, 0.8), rgba(255, 100, 0, 0.3), transparent)',
          filter: 'blur(15px)',
        }}
      />
      
      {/* Floating dust particles in the light beam */}
      <div
        ref={dustRef}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none"
        style={{ width: '300px', height: '300px' }}
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-400/40"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s infinite ease-in-out`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
      
      {/* Left Door */}
      <div
        ref={doorLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-2xl"
        style={{
          transformOrigin: 'left center',
          boxShadow: '10px 0 30px rgba(0,0,0,0.8)',
        }}
      >
        {/* Door panel details */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-48 border-2 border-amber-700/50 rounded-lg" />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-48 border-2 border-amber-700/50 rounded-lg" />
        <div className="absolute top-1/2 left-3/4 w-2 h-12 bg-amber-600 rounded-full" />
      </div>
      
      {/* Right Door */}
      <div
        ref={doorRightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900 via-amber-800 to-amber-900 shadow-2xl"
        style={{
          transformOrigin: 'right center',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
        }}
      >
        {/* Door panel details */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-48 border-2 border-amber-700/50 rounded-lg" />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-48 border-2 border-amber-700/50 rounded-lg" />
      </div>
      
      {/* Door frame / archway */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-4px)] h-32 bg-gradient-to-b from-amber-800 to-amber-900/50 pointer-events-none" />
      
      {/* Dark edges for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent" />
      </div>
      
      {/* "COMING SOON!" Text */}
      <div
        ref={textRef}
        className="absolute bottom-32 left-0 right-0 text-center z-20"
      >
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-wider"
          style={{
            fontFamily: "'Arial Black', 'Impact', 'PingFang SC', 'Microsoft YaHei', sans-serif",
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FF6347 70%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 30px rgba(255, 100, 0, 0.5)',
            letterSpacing: '8px',
          }}
        >
          COMING SOON!
        </h1>
        
        {/* Subtitle */}
        <div className="mt-4 text-yellow-500/80 text-sm md:text-base tracking-[4px] uppercase font-mono">
          ✦ Prepare for something extraordinary ✦
        </div>
      </div>
      
      {/* Light rays coming through the door */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-t from-yellow-500/0 via-yellow-400/20 to-transparent"
            style={{
              width: '2px',
              height: '100%',
              left: `${30 + Math.random() * 40}%`,
              top: 0,
              animation: `ray ${Math.random() * 2 + 1}s infinite`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.8;
          }
        }
        
        @keyframes ray {
          0% {
            opacity: 0;
            transform: translateY(100%) scaleY(0);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: translateY(-100%) scaleY(1);
          }
        }
        
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 200, 50, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 100, 0, 0.9), 0 0 60px rgba(255, 200, 50, 0.6);
          }
        }
        
        @keyframes lightPulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        
        .text-glow {
          animation: textGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Instruction / hint */}
      <div className="absolute bottom-4 left-4 text-white/30 text-xs font-mono z-30">
        {animationComplete ? '✦ Experience ready ✦' : '⟳ Opening the doorway...'}
      </div>
    </div>
  );
};

export default DoorwayReveal;