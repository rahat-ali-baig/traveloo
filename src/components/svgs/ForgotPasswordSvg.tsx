"use client";

import { useState, useEffect } from "react";

const ForgotPasswordSvg = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#000000]">
            <div className="absolute inset-0 h-full w-full bg-linear-to-br from-[#000000] to-emerald-950/40 opacity-80">
                <svg
                    className={`h-full w-full transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                    viewBox="0 0 800 1000"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="viewBox">
                            <rect x="0" y="0" width="800" height="1000" />
                        </clipPath>
                        
                        <linearGradient id="fill1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#0f3d22" stop-opacity="0.9" />
                            <stop offset="100%" stop-color="#0a2b16" stop-opacity="0.4" />
                        </linearGradient>

                        <linearGradient id="fill2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#064e3b" stop-opacity="0.8" />
                            <stop offset="100%" stop-color="#022c22" stop-opacity="0.5" />
                        </linearGradient>
                        
                        <linearGradient id="fill3" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#10b981" stop-opacity="0.15" />
                            <stop offset="100%" stop-color="#059669" stop-opacity="0.3" />
                        </linearGradient>
                    </defs>

                    <g clipPath="url(#viewBox)">
                        {/* ── LARGE ELEGANT FILLED GEOMETRY ── */}
                        
                        {/* Top Left Angle */}
                        <polygon points="0,0 500,0 0,600" fill="url(#fill1)" />
                        
                        {/* Center Diamond / Overlap */}
                        <polygon points="400,200 700,500 400,800 100,500" fill="url(#fill2)" opacity="0.8" />
                        
                        {/* Right sweeping shapes */}
                        <path d="M 800 0 L 800 600 Q 600 500 600 200 Z" fill="url(#fill3)" />
                        
                        {/* Bottom rich fill */}
                        <path d="M 0 1000 L 800 1000 L 800 800 Q 400 700 0 900 Z" fill="url(#fill1)" opacity="0.85" />
                        
                        {/* Circular intersecting accents (Solid fills) */}
                        <circle cx="200" cy="200" r="150" fill="#022c22" opacity="0.6" />
                        <circle cx="200" cy="200" r="80" fill="#0f3d22" opacity="0.4" />
                        
                        <circle cx="650" cy="750" r="200" fill="#064e3b" opacity="0.5" />
                        <circle cx="750" cy="850" r="100" fill="#10b981" opacity="0.1" />
                        
                        {/* Solid geometric blocks */}
                        <rect x="50" y="700" width="120" height="120" transform="rotate(15 50 700)" fill="url(#fill3)" />
                        <rect x="550" y="100" width="80" height="80" transform="rotate(45 550 100)" fill="#0f3d22" opacity="0.9" />
                        
                        {/* Subtle thick accent lines to anchor the filled shapes */}
                        <line x1="100" y1="500" x2="400" y2="800" stroke="#34d399" strokeWidth="3" opacity="0.2" />
                        <line x1="400" y1="200" x2="700" y2="500" stroke="#34d399" strokeWidth="3" opacity="0.2" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default ForgotPasswordSvg;
