"use client";

import { Map, BadgeCheck, ShieldCheck, PlaneTakeoff } from "lucide-react";
import { useRef, useState } from "react";

const STEPS = [
    {
        num: "01",
        title: "Find Your Trip",
        desc: "Filter by destination, difficulty, or price to find the perfect adventure.",
        icon: Map,
    },
    {
        num: "02",
        title: "Verify the Operator",
        desc: "Check transparent reviews, past trips, and company registration.",
        icon: BadgeCheck,
    },
    {
        num: "03",
        title: "Book Securely",
        desc: "Pay through our escrow system. Your funds are protected until the trip happens.",
        icon: ShieldCheck,
    },
    {
        num: "04",
        title: "Travel & Review",
        desc: "Enjoy your adventure and leave an honest review to help others.",
        icon: PlaneTakeoff,
    }
];

const StepCard = ({ step, index }: { step: typeof STEPS[0], index: number }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-8 md:p-10 h-[380px] transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.15)]"
        >
            {/* Hover Spotlight */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(52,211,153,.08), transparent 40%)`,
                }}
            />

            {/* Glowing Icon Container */}
            <div className="relative z-10 w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors duration-500">
                <step.icon className="w-7 h-7 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                {/* Subtle pulse behind icon */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
                {/* Connecting Line Node Point */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-[11px] uppercase tracking-widest font-medium text-emerald-400">Step {index + 1}</span>
                    <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-[13px] text-white/50 leading-[1.6] font-light">{step.desc}</p>
            </div>

            {/* Massive Faded Background Number */}
            <span className="absolute -bottom-6 -right-4 text-[160px] font-bold text-white/[0.02] leading-none select-none group-hover:text-emerald-500/[0.04] transition-colors duration-500 pointer-events-none">
                {step.num}
            </span>
        </div>
    );
};

const HowItWorks = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#000000] py-32 border-b border-white/5">
            {/* Ambient Background Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 mb-6 block">How It Works</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-medium text-white mb-6 tracking-tight">
                        Your Journey in <span className="text-emerald-400 italic font-light">4 Steps</span>
                    </h2>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                        We've engineered the entire booking process to be completely transparent, highly secure, and incredibly effortless.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Continuous background line for desktop */}
                    <div className="hidden lg:block absolute top-[280px] left-0 right-0 h-px bg-white/5" />
                    
                    {STEPS.map((step, i) => (
                        <div key={i} className="relative z-10 group cursor-default">
                            <StepCard step={step} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
