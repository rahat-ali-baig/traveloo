"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const TEAM = [
    {
        name: "Ali Raza",
        role: "Founder & CEO",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        bio: "Ali built Safarly to bring trust back to Pakistani travel after a disastrous trip to the North left him stranded without support."
    },
    {
        name: "Sarah Khan",
        role: "Head of Operations",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        bio: "With 10 years in hospitality, Sarah ensures every tour operator on our platform meets strict safety and quality standards."
    },
    {
        name: "Usman Tariq",
        role: "Lead Engineer",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        bio: "Usman architects the escrow systems and robust booking infrastructure that makes Safarly completely bulletproof."
    }
];

const SpotlightCard = ({ member, isActive }: { member: typeof TEAM[0], isActive: boolean }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => { setIsFocused(true); setOpacity(1); };
    const handleBlur = () => { setIsFocused(false); setOpacity(0); };
    const handleMouseEnter = () => { setOpacity(1); };
    const handleMouseLeave = () => { setOpacity(0); };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden rounded-[32px] border border-white/5 bg-[#0a0a0a] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-2xl h-[450px] md:h-[600px] w-full ${isActive ? 'opacity-100 grayscale-0 scale-100' : 'opacity-40 grayscale hover:opacity-60 scale-[0.98]'}`}
        >
            {/* Image fills the card */}
            <Image src={member.img} alt={member.name} fill className="object-cover object-center transition-all duration-1000" />
            
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Spotlight Glow Background (Very Low Opacity for subtle impact) */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.04), transparent 40%)`,
                }}
            />
            
            {/* Spotlight Glow Border Reveal (Low Opacity) */}
            <div
                className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition duration-500 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.15), transparent 40%)`,
                    maskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px'
                }}
            />

            {/* Content inside the card */}
            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end z-20">
                <h3 className="text-3xl md:text-[54px] font-medium text-white tracking-tight leading-none">{member.role}</h3>
            </div>
        </div>
    );
};

const OurTeam = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === TEAM.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? TEAM.length - 1 : prev - 1));
    };

    const activeMember = TEAM[currentIndex];

    return (
        <section className="relative w-full overflow-hidden bg-[#000000] py-24">
            {/* Header */}
            <div className="px-6 md:px-12 lg:px-24 mb-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-4 block">The Builders</span>
                <h2 className="text-3xl md:text-5xl font-poppins font-medium text-white">Our Team</h2>
            </div>

            {/* Slider Container */}
            <div className="relative w-full pb-16 overflow-hidden">
                {/* Slider Track */}
                <div 
                    className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `translateX(calc(-${currentIndex} * (min(85vw, 900px) + 24px)))` }}
                >
                    {/* Padding block to align the first item perfectly with the page padding */}
                    <div className="shrink-0 w-[24px] md:w-[48px] lg:w-[96px]" />
                    
                    {TEAM.map((member, i) => (
                        <div 
                            key={i} 
                            onClick={() => setCurrentIndex(i)}
                            className="shrink-0 mr-6"
                            style={{ width: 'min(85vw, 900px)' }}
                        >
                            <SpotlightCard member={member} isActive={i === currentIndex} />
                        </div>
                    ))}
                    
                    {/* Extra padding at the end so the last card doesn't hit the right edge */}
                    <div className="shrink-0 w-[24px] md:w-[48px] lg:w-[96px]" />
                </div>
            </div>

            {/* Bottom Info Section (Exactly matching Antigravity layout) */}
            <div className="px-6 md:px-12 lg:px-24 flex flex-row justify-between items-start mt-6 gap-8">
                <div className="max-w-md">
                    <p className="text-[15px] font-medium text-white mb-1">{activeMember.role}</p>
                    <p className="text-[14px] text-white/50 leading-[1.6] font-light mb-5">
                        {activeMember.bio}
                    </p>
                    <button className="text-[13px] text-white/70 hover:text-white flex items-center gap-1 group transition-colors">
                        View case 
                        <span className="text-[15px] leading-none font-light transition-transform group-hover:translate-x-1">›</span>
                    </button>
                </div>
                
                {/* Navigation Pill */}
                <div className="flex items-center rounded-full bg-[#151515] px-1 py-1 shrink-0">
                    <button 
                        onClick={prevSlide}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors text-lg pb-1"
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <div className="w-1"></div>
                    <button 
                        onClick={nextSlide}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors text-lg pb-1"
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
