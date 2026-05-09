"use client";

import { useState, useEffect } from "react";

const ResetSvg = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-emerald-500/10 animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-emerald-500/8 animate-pulse delay-1000" />
            </div>

            <div className="absolute inset-0 z-10">
                <svg className="w-full h-full" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#34d399" stop-opacity="0.15" />
                            <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Center Glow */}
                    <circle cx="400" cy="500" r="300" fill="url(#centerGlow)" />

                    {/* Classic Interlocking Geometry (Guilloche / Mandala Style) */}
                    <g className={`transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transformOrigin: "400px 500px" }}>
                        {/* Outer Classic Ring */}
                        {Array.from({ length: 24 }).map((_, i) => (
                            <ellipse
                                key={`outer-${i}`}
                                cx="400"
                                cy="500"
                                rx="300"
                                ry="100"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="0.5"
                                opacity="0.4"
                                transform={`rotate(${i * 15} 400 500)`}
                            />
                        ))}

                        {/* Mid Intricate Ring */}
                        {Array.from({ length: 36 }).map((_, i) => (
                            <ellipse
                                key={`mid-${i}`}
                                cx="400"
                                cy="500"
                                rx="200"
                                ry="40"
                                fill="none"
                                stroke="#34d399"
                                strokeWidth="0.75"
                                opacity="0.5"
                                transform={`rotate(${i * 10} 400 500)`}
                            />
                        ))}

                        {/* Inner Dense Ring */}
                        {Array.from({ length: 48 }).map((_, i) => (
                            <ellipse
                                key={`inner-${i}`}
                                cx="400"
                                cy="500"
                                rx="100"
                                ry="15"
                                fill="none"
                                stroke="#6ee7b7"
                                strokeWidth="1"
                                opacity="0.6"
                                transform={`rotate(${i * 7.5} 400 500)`}
                            />
                        ))}

                        {/* Center Emblem Details */}
                        <circle cx="400" cy="500" r="85" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.8" strokeDasharray="4 4" />
                        <circle cx="400" cy="500" r="70" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6" />
                        <circle cx="400" cy="500" r="50" fill="none" stroke="#34d399" strokeWidth="0.5" opacity="0.9" />
                        
                        {/* Central Star/Flower */}
                        <path 
                            d="M 400 460 Q 400 500 440 500 Q 400 500 400 540 Q 400 500 360 500 Q 400 500 400 460 Z" 
                            fill="#6ee7b7" 
                            opacity="0.8" 
                        />
                    </g>
                </svg>
            </div>

            {/* Subtle Scanning Light */}
            <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
                <div className="absolute top-0 left-[-35%] h-full w-[14%] rotate-12 bg-linear-to-r from-transparent via-emerald-400/6 to-transparent blur-3xl animate-[scan_14s_linear_infinite]" />
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
            `}</style>
        </div>
    );
};

export default ResetSvg;
