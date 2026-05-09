"use client";

import { useState, useEffect } from "react";

type PatternType =
    | "halftoneWaves"
    | "geometricTriangles"
    | "flowingLiquid"
    | "hexagonGrid"
    | "starsParticles"
    | "circuitLines"
    | "abstractWaves"
    | "mandala";

interface SignUpSvgProps {
    pattern?: PatternType;
    className?: string;
}

const SignUpSvg = ({ pattern = "halftoneWaves", className = "" }: SignUpSvgProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-emerald-500/10 animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-emerald-500/8 animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full blur-[100px] bg-emerald-400/5 animate-pulse delay-2000" />
            </div>

            <div className="absolute inset-0 z-5 pointer-events-none">
                <div className={`absolute top-[15%] left-[20%] w-16 h-16 rounded-full bg-emerald-500/20 blur-xl animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0s' }} />
                <div className={`absolute top-[60%] left-[60%] w-24 h-24 rounded-full bg-emerald-400/15 blur-2xl animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }} />
                <div className={`absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full bg-emerald-500/10 blur-xl animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '3s' }} />
                <div className={`absolute top-[40%] right-[15%] w-14 h-14 rounded-full bg-emerald-400/20 blur-lg animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }} />
            </div>

            <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
                <div className={`absolute top-[10%] left-[30%] w-1 h-1 rounded-full bg-emerald-400/60 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0s' }} />
                <div className={`absolute top-[25%] left-[70%] w-1.5 h-1.5 rounded-full bg-emerald-300/50 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }} />
                <div className={`absolute top-[45%] left-[15%] w-0.5 h-0.5 rounded-full bg-emerald-400/70 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.4s' }} />
                <div className={`absolute top-[55%] left-[80%] w-1 h-1 rounded-full bg-emerald-300/60 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '2.1s' }} />
                <div className={`absolute top-[70%] left-[40%] w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }} />
                <div className={`absolute top-[85%] left-[60%] w-0.5 h-0.5 rounded-full bg-emerald-300/80 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.8s' }} />
                <div className={`absolute top-[35%] left-[50%] w-1 h-1 rounded-full bg-emerald-400/60 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '2.8s' }} />
                <div className={`absolute top-[10%] left-[85%] w-1.5 h-1.5 rounded-full bg-emerald-300/50 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }} />
                <div className={`absolute bottom-[15%] left-[25%] w-0.5 h-0.5 rounded-full bg-emerald-400/70 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '3.2s' }} />
                <div className={`absolute top-[65%] left-[5%] w-1 h-1 rounded-full bg-emerald-300/60 animate-particle ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }} />
            </div>

            <div className="absolute inset-0 z-10">
                {pattern === "halftoneWaves" && <HalftoneWaves />}
                {pattern === "geometricTriangles" && <GeometricTriangles />}
                {pattern === "flowingLiquid" && <FlowingLiquid />}
                {pattern === "hexagonGrid" && <HexagonGrid />}
                {pattern === "starsParticles" && <StarsParticles />}
                {pattern === "circuitLines" && <CircuitLines />}
                {pattern === "abstractWaves" && <AbstractWaves />}
                {pattern === "mandala" && <Mandala />}
            </div>

            <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
                <div className="absolute top-0 left-[-35%] h-full w-[18%] rotate-12 bg-linear-to-r from-transparent via-emerald-400/8 to-transparent blur-3xl animate-[scan_14s_linear_infinite]" />
            </div>
        </div>
    );
};

const HalftoneWaves = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <pattern id="halftone" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1" fill="#10b981" opacity="0.5" />
            </pattern>
            <pattern id="halftoneAccent" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="0.8" fill="#34d399" opacity="0.3" />
            </pattern>
            <mask id="waveMask">
                <g>
                    <path d="M-100,100 C50,50 150,200 300,100 C450,0 500,150 600,100" stroke="white" strokeWidth="60" fill="none" opacity="0.8" />
                    <path d="M-100,220 C50,170 150,320 300,220 C450,120 500,270 600,220" stroke="white" strokeWidth="60" fill="none" opacity="0.6" />
                    <path d="M-100,340 C50,290 150,440 300,340 C450,240 500,390 600,340" stroke="white" strokeWidth="60" fill="none" opacity="0.4" />
                    <path d="M-100,460 C50,410 150,560 300,460 C450,360 500,510 600,460" stroke="white" strokeWidth="60" fill="none" opacity="0.2" />
                    <path d="M-100,580 C50,530 150,680 300,580 C450,480 500,630 600,580" stroke="white" strokeWidth="60" fill="none" opacity="0.1" />
                </g>
            </mask>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <rect width="400" height="600" fill="url(#halftone)" mask="url(#waveMask)" />
        <rect width="400" height="600" fill="url(#halftoneAccent)" mask="url(#waveMask)" opacity="0.5" />
        <g opacity="0.3">
            <circle cx="200" cy="120" r="15" fill="url(#centerGlow)" />
            <circle cx="350" cy="240" r="12" fill="url(#centerGlow)" />
            <circle cx="180" cy="360" r="18" fill="url(#centerGlow)" />
        </g>
    </svg>
);

const GeometricTriangles = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="brightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <pattern id="triangles" width="30" height="52" patternUnits="userSpaceOnUse">
                <polygon points="15,0 30,26 0,26" fill="none" stroke="#10b981" strokeWidth="0.3" opacity="0.25" />
                <polygon points="15,52 30,26 0,26" fill="url(#greenGrad)" stroke="#10b981" strokeWidth="0.3" opacity="0.15" />
            </pattern>
            <pattern id="trianglesBright" width="60" height="104" patternUnits="userSpaceOnUse">
                <polygon points="30,0 60,52 0,52" fill="none" stroke="#34d399" strokeWidth="0.2" opacity="0.1" />
            </pattern>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <rect width="400" height="600" fill="url(#triangles)" />
        <rect width="400" height="600" fill="url(#trianglesBright)" />
        <g opacity="0.15">
            <polygon points="200,100 250,180 150,180" fill="url(#brightGrad)" />
            <polygon points="300,400 350,480 250,480" fill="url(#brightGrad)" />
            <polygon points="100,350 150,430 50,430" fill="url(#brightGrad)" />
        </g>
    </svg>
);

const FlowingLiquid = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="liquid1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="liquid2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#065f46" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="liquidAccent" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <g>
            <path d="M-50,80 C50,30 150,160 250,80 C350,0 400,130 500,60 V600 H-50 Z" fill="url(#liquid1)" className="animate-float" style={{ animationDelay: '0s' }} />
            <path d="M-50,160 C100,80 200,210 300,140 C400,70 450,160 500,110 V600 H-50 Z" fill="url(#liquid2)" className="animate-float" style={{ animationDelay: '1.5s' }} />
            <path d="M-50,280 C80,210 180,330 280,250 C380,170 430,280 500,230 V600 H-50 Z" fill="#10b981" opacity="0.05" className="animate-float" style={{ animationDelay: '0.8s' }} />
            <path d="M-50,400 C100,320 200,420 300,350 C400,280 450,380 500,330 V600 H-50 Z" fill="url(#liquidAccent)" className="animate-float" style={{ animationDelay: '2.2s' }} />
            <path d="M-50,520 C80,450 180,550 280,480 C380,410 430,510 500,460 V600 H-50 Z" fill="#34d399" opacity="0.03" className="animate-float" style={{ animationDelay: '3s' }} />
        </g>
    </svg>
);

const HexagonGrid = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <pattern id="hexagons" width="30" height="52" patternUnits="userSpaceOnUse">
                <polygon points="15,0 30,13 30,39 15,52 0,39 0,13" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.25" />
                <polygon points="0,13 15,0 30,13 30,39 15,52 0,39" fill="#10b981" opacity="0.05" />
            </pattern>
            <pattern id="hexagonsAccent" width="60" height="104" patternUnits="userSpaceOnUse">
                <polygon points="30,0 60,26 60,78 30,104 0,78 0,26" fill="none" stroke="#34d399" strokeWidth="0.3" opacity="0.1" />
            </pattern>
            <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                <stop offset="60%" stopColor="transparent" />
                <stop offset="100%" stopColor="#050505" stopOpacity="0.8" />
            </radialGradient>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <rect width="400" height="600" fill="url(#hexagons)" />
        <rect width="400" height="600" fill="url(#hexagonsAccent)" />
        <g opacity="0.3">
            <polygon points="120,240 150,253 150,279 120,292 90,279 90,253" fill="#34d399" opacity="0.1" stroke="#34d399" strokeWidth="0.5" />
            <polygon points="270,400 300,413 300,439 270,452 240,439 240,413" fill="#34d399" opacity="0.1" stroke="#34d399" strokeWidth="0.5" />
            <polygon points="60,480 90,493 90,519 60,532 30,519 30,493" fill="#10b981" opacity="0.08" stroke="#10b981" strokeWidth="0.5" />
        </g>
        <rect width="400" height="600" fill="url(#vignette)" />
    </svg>
);

const StarsParticles = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="strongGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <g stroke="#10b981" strokeWidth="0.3" opacity="0.1">
            <line x1="50" y1="80" x2="120" y2="150" />
            <line x1="120" y1="150" x2="200" y2="120" />
            <line x1="200" y1="120" x2="280" y2="180" />
            <line x1="80" y1="300" x2="150" y2="350" />
            <line x1="150" y1="350" x2="250" y2="320" />
            <line x1="250" y1="320" x2="320" y2="400" />
        </g>
        <g>
            <circle cx="50" cy="80" r="2" fill="#10b981" filter="url(#glow)" />
            <circle cx="200" cy="150" r="2.5" fill="#34d399" filter="url(#strongGlow)" />
            <circle cx="350" cy="60" r="1.5" fill="#10b981" filter="url(#glow)" />
            <circle cx="80" cy="300" r="2.5" fill="#34d399" filter="url(#strongGlow)" />
            <circle cx="320" cy="400" r="3" fill="#10b981" filter="url(#strongGlow)" />
            <circle cx="150" cy="500" r="2" fill="#34d399" filter="url(#glow)" />
            <circle cx="250" cy="350" r="1.5" fill="#10b981" filter="url(#glow)" />
            <circle cx="100" cy="550" r="2.5" fill="#34d399" filter="url(#glow)" />
            <circle cx="280" cy="250" r="2" fill="#10b981" filter="url(#glow)" />
            <circle cx="380" cy="180" r="1.5" fill="#34d399" filter="url(#glow)" />
            <g opacity="0.6">
                <line x1="300" y1="50" x2="350" y2="100" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="300" y1="50" x2="270" y2="20" stroke="#34d399" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
            </g>
            <g opacity="0.4">
                <circle cx="30" cy="150" r="0.8" fill="#10b981" />
                <circle cx="120" cy="50" r="1" fill="#34d399" />
                <circle cx="280" cy="100" r="0.8" fill="#10b981" />
                <circle cx="370" cy="200" r="1" fill="#34d399" />
                <circle cx="60" cy="420" r="0.8" fill="#10b981" />
                <circle cx="380" cy="500" r="1" fill="#34d399" />
                <circle cx="220" cy="550" r="0.8" fill="#10b981" />
                <circle cx="300" cy="250" r="1" fill="#34d399" />
                <circle cx="180" cy="200" r="0.8" fill="#10b981" />
                <circle cx="40" cy="350" r="0.8" fill="#34d399" />
                <circle cx="280" cy="450" r="1" fill="#10b981" />
                <circle cx="120" cy="400" r="0.8" fill="#34d399" />
                <circle cx="350" cy="350" r="0.8" fill="#10b981" />
                <circle cx="60" cy="250" r="1" fill="#34d399" />
            </g>
        </g>
    </svg>
);

const CircuitLines = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <g stroke="#10b981" fill="none" opacity="0.35">
            <line x1="0" y1="80" x2="400" y2="80" strokeWidth="0.3" />
            <line x1="0" y1="180" x2="400" y2="180" strokeWidth="0.3" />
            <line x1="0" y1="280" x2="400" y2="280" strokeWidth="0.3" />
            <line x1="0" y1="380" x2="400" y2="380" strokeWidth="0.3" />
            <line x1="0" y1="480" x2="400" y2="480" strokeWidth="0.3" />
            <line x1="0" y1="580" x2="400" y2="580" strokeWidth="0.3" />
            <line x1="60" y1="0" x2="60" y2="600" strokeWidth="0.3" />
            <line x1="140" y1="0" x2="140" y2="600" strokeWidth="0.3" />
            <line x1="220" y1="0" x2="220" y2="600" strokeWidth="0.3" />
            <line x1="300" y1="0" x2="300" y2="600" strokeWidth="0.3" />
            <line x1="380" y1="0" x2="380" y2="600" strokeWidth="0.3" />
            <path d="M60,80 L140,80 L140,180" strokeWidth="0.3" opacity="0.3" />
            <path d="M220,80 L300,80 L300,180" strokeWidth="0.3" opacity="0.3" />
            <path d="M140,180 L220,180 L220,280" strokeWidth="0.3" opacity="0.3" />
            <path d="M300,280 L380,280 L380,380" strokeWidth="0.3" opacity="0.3" />
            <path d="M60,380 L140,380 L140,480" strokeWidth="0.3" opacity="0.3" />
            <path d="M220,480 L300,480 L300,580" strokeWidth="0.3" opacity="0.3" />
            <circle cx="60" cy="80" r="3" fill="#34d399" stroke="none" />
            <circle cx="140" cy="80" r="2" fill="#10b981" stroke="none" />
            <circle cx="220" cy="80" r="3" fill="#34d399" stroke="none" />
            <circle cx="300" cy="80" r="2" fill="#10b981" stroke="none" />
            <circle cx="60" cy="180" r="2" fill="#10b981" stroke="none" />
            <circle cx="140" cy="180" r="3" fill="#34d399" stroke="none" />
            <circle cx="220" cy="180" r="2" fill="#10b981" stroke="none" />
            <circle cx="300" cy="180" r="3" fill="#34d399" stroke="none" />
            <circle cx="60" cy="280" r="3" fill="#34d399" stroke="none" />
            <circle cx="140" cy="280" r="2" fill="#10b981" stroke="none" />
            <circle cx="220" cy="280" r="3" fill="#34d399" stroke="none" />
            <circle cx="300" cy="280" r="2" fill="#10b981" stroke="none" />
            <circle cx="60" cy="380" r="2" fill="#10b981" stroke="none" />
            <circle cx="140" cy="380" r="3" fill="#34d399" stroke="none" />
            <circle cx="220" cy="380" r="2" fill="#10b981" stroke="none" />
            <circle cx="300" cy="380" r="3" fill="#34d399" stroke="none" />
            <circle cx="220" cy="280" r="8" fill="url(#nodeGlow)" stroke="none" />
            <circle cx="220" cy="280" r="2" fill="#34d399" stroke="none" />
        </g>
    </svg>
);

const AbstractWaves = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
            </linearGradient>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <g opacity="0.5">
            <path d="M-50,120 C50,80 150,160 250,120 C350,80 400,140 450,100" stroke="#10b981" strokeWidth="1.5" fill="none" />
            <path d="M-50,200 C50,140 150,240 250,180 C350,120 400,220 450,170" stroke="#34d399" strokeWidth="1.2" fill="none" />
            <path d="M-50,280 C50,220 150,320 250,260 C350,200 400,300 450,250" stroke="#10b981" strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M-50,360 C50,300 150,400 250,340 C350,280 400,380 450,330" stroke="#34d399" strokeWidth="0.6" fill="none" opacity="0.4" />
            <path d="M-50,440 C50,380 150,480 250,420 C350,360 400,460 450,410" stroke="#10b981" strokeWidth="0.4" fill="none" opacity="0.3" />
            <path d="M-50,520 C50,460 150,560 250,500 C350,440 400,540 450,490" stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.2" />
            <path d="M-50,120 C50,80 150,160 250,120 C350,80 400,140 450,100 V130 C350,170 250,150 150,190 V160 Z" fill="url(#waveGrad1)" opacity="0.3" />
            <path d="M-50,280 C50,220 150,320 250,260 C350,200 400,300 450,250 V290 C350,330 250,350 150,350 V310 Z" fill="url(#waveGrad2)" opacity="0.2" />
        </g>
    </svg>
);

const Mandala = () => (
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
            </radialGradient>
        </defs>
        <rect width="400" height="600" fill="#050505" />
        <g transform="translate(200,300)" opacity="0.4">
            <circle cx="0" cy="0" r="250" fill="url(#outerGlow)" />
            <circle cx="0" cy="0" r="25" stroke="#10b981" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="50" stroke="#34d399" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="75" stroke="#10b981" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="100" stroke="#34d399" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="125" stroke="#10b981" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="150" stroke="#34d399" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="175" stroke="#10b981" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="200" stroke="#34d399" strokeWidth="0.3" fill="none" />
            <circle cx="0" cy="0" r="225" stroke="#10b981" strokeWidth="0.3" fill="none" opacity="0.5" />
            <circle cx="0" cy="0" r="250" stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.3" />
            <g stroke="#10b981" strokeWidth="0.2" opacity="0.5">
                <line x1="0" y1="0" x2="0" y2="-240" />
                <line x1="0" y1="0" x2="0" y2="240" />
                <line x1="0" y1="0" x2="240" y2="0" />
                <line x1="0" y1="0" x2="-240" y2="0" />
                <line x1="0" y1="0" x2="170" y2="-170" />
                <line x1="0" y1="0" x2="-170" y2="-170" />
                <line x1="0" y1="0" x2="170" y2="170" />
                <line x1="0" y1="0" x2="-170" y2="170" />
                <line x1="0" y1="0" x2="92" y2="-221" />
                <line x1="0" y1="0" x2="-92" y2="-221" />
                <line x1="0" y1="0" x2="92" y2="221" />
                <line x1="0" y1="0" x2="-92" y2="221" />
                <line x1="0" y1="0" x2="221" y2="-92" />
                <line x1="0" y1="0" x2="-221" y2="-92" />
                <line x1="0" y1="0" x2="221" y2="92" />
                <line x1="0" y1="0" x2="-221" y2="92" />
            </g>
            <g stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.3">
                <path d="M0,-150 A30,30 0 0,1 30,-147" />
                <path d="M0,-150 A30,30 0 0,0 -30,-147" />
                <path d="M150,0 A30,30 0 0,1 147,30" />
                <path d="M150,0 A30,30 0 0,0 147,-30" />
            </g>
            <circle cx="0" cy="0" r="40" fill="url(#centerGlow)" />
            <circle cx="0" cy="0" r="3" fill="#34d399" opacity="0.8" />
        </g>
    </svg>
);

export default SignUpSvg;