"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/core/PrimaryButton";

type Role = "traveller" | "company";

const LoginPage = () => {
    const router = useRouter();
    const [role, setRole] = useState<Role>("traveller");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreeTerms) {
            alert("Please agree to the Terms of Use and Privacy Policy");
            return;
        }
        router.push(role === "company" ? "/dashboard" : "/explore");
    };

    return (
        <section className="relative flex min-h-screen w-full overflow-hidden">
            {/* ── DARK GREEN AMBIENT BACKGROUND ── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Brighter ambient glows */}
                    {/* <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-emerald-500/10" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-emerald-500/8" />
                    <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full blur-[100px] bg-emerald-400/5" /> */}
                </div>

                {/* <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(74,171,100,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(74,171,100,0.15) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                /> */}
            </div>

            {/* ── LEFT HALF: BRIGHT/SHINY GEOMETRIC PATTERN ── */}
            <div className="hidden lg:block lg:w-1/2 relative h-full min-h-screen overflow-hidden z-10">
                <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-emerald-400/40 to-transparent" />

                <div className="absolute inset-0 h-full w-full bg-linear-to-br from-[#000000] to-emerald-950/20 opacity-60">
                    <svg
                        className="h-full w-full"
                        viewBox="0 0 800 800"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <clipPath id="viewBox">
                                <rect x="0" y="0" width="800" height="900" />
                            </clipPath>
                        </defs>

                        <g clipPath="url(#viewBox)">
                            {/* ── FILLED BRIGHTER GREEN SHAPES ── */}
                            <polygon points="0,0 300,0 0,300" fill="#0f3d22" opacity="0.7" />
                            <circle cx="650" cy="150" r="120" fill="#0a2b16" opacity="0.7" />
                            <rect x="150" y="400" width="200" height="200" fill="#0f3d22" opacity="0.6" />
                            <circle cx="100" cy="750" r="100" fill="#0a2b16" opacity="0.7" />
                            <polygon points="700,650 800,750 700,850 600,750" fill="#0f3d22" opacity="0.6" />
                            <polygon points="400,300 550,500 250,500" fill="#0a2b16" opacity="0.6" />

                            {/* ── OUTLINE BRIGHTER GREEN SHAPES ── */}
                            <rect x="50" y="50" width="180" height="180" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.7" filter="url(#glow)" />
                            <polygon points="500,20 620,180 380,180" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.6" filter="url(#glow)" />
                            <circle cx="80" cy="480" r="60" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.7" filter="url(#glow)" />
                            <polygon points="600,350 690,400 690,500 600,550 510,500 510,400" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.6" filter="url(#glow)" />
                            <polygon points="250,680 350,780 250,880 150,780" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.7" filter="url(#glow)" />
                            <rect x="380" y="700" width="140" height="140" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.6" filter="url(#glow)" />
                            <path d="M680,800 A120,120 0 0,1 800,800 L800,920 L680,920 Z" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.7" filter="url(#glow)" />

                            {/* ── MIXED LAYERING ── */}
                            <circle cx="350" cy="200" r="80" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.6" filter="url(#glow)" />
                            <circle cx="350" cy="200" r="40" fill="#0f3d22" opacity="0.7" />
                            <rect x="450" y="600" width="120" height="120" fill="#0a2b16" opacity="0.7" />
                            <rect x="465" y="615" width="90" height="90" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.6" filter="url(#glow)" />
                            <polygon points="0,600 100,700 0,800" fill="#0f3d22" opacity="0.7" />
                            <polygon points="20,620 80,700 20,780" fill="none" stroke="#2d8a4e" strokeWidth="2.5" opacity="0.6" filter="url(#glow)" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* ── RIGHT HALF: LOGIN FORM ── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20 relative z-10">
                <div
                    className={`w-full max-w-[440px] transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                >
                    {/* Glass Card - Enhanced Appeal */}
                    <div
                        className="relative overflow-hidden rounded-3xl border border-emerald-400/20 p-8 shadow-2xl"
                        style={{
                            background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        {/* Enhanced glow edges */}
                        <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />
                        <div className="pointer-events-none absolute bottom-0 left-[30%] right-[30%] h-px bg-linear-to-r from-transparent via-emerald-400/20 to-transparent" />
                        <div className="pointer-events-none absolute left-0 top-[20%] bottom-[20%] w-px bg-linear-to-b from-transparent via-emerald-400/10 to-transparent" />

                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-300/60 mt-1">
                                Sign in to continue
                            </p>
                        </div>

                        {/* Role toggle - Enhanced */}
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-[8px] uppercase tracking-[0.4em] text-emerald-300/50">I am a</span>
                            <div className="flex gap-0.5 rounded-full border border-emerald-400/20 p-0.5 bg-black/60">
                                {(["traveller", "company"] as Role[]).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`rounded-full px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${role === r
                                            ? "border border-emerald-400/40 bg-emerald-400/20 text-emerald-300 shadow-[0_0_20px_rgba(74,171,100,0.15)]"
                                            : "border border-transparent bg-transparent text-white/40 hover:text-white/70"
                                            }`}
                                    >
                                        {r === "traveller" ? "Traveller" : "Company"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username - Enhanced */}
                            <div>
                                <label className="mb-1.5 block text-[8.5px] uppercase tracking-[0.35em] text-emerald-300/50">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="your_username"
                                        required
                                        className="w-full rounded-xl border border-emerald-400/15 bg-black/70 py-3.5 px-4 text-[13px] text-white placeholder-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-black/90 focus:ring-1 focus:ring-emerald-400/30"
                                    />
                                </div>
                            </div>

                            {/* Password - Enhanced */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label className="text-[8.5px] uppercase tracking-[0.35em] text-emerald-300/50">
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-[8.5px] uppercase tracking-[0.2em] text-emerald-300/50 transition-colors hover:text-emerald-300"
                                    >
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full rounded-xl border border-emerald-400/15 bg-black/70 py-3.5 px-4 pr-11 text-[13px] text-white placeholder-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-black/90 focus:ring-1 focus:ring-emerald-400/30"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/40 hover:text-emerald-400/80 transition-colors"
                                    >
                                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                                            <ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1" />
                                            {showPassword ? (
                                                <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                            ) : (
                                                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Terms & Conditions - Enhanced */}
                            <div className="flex items-start gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="h-4 w-4 accent-emerald-500 rounded-lg"
                                />
                                <label htmlFor="terms" className="text-xs text-emerald-300/60 leading-tight">
                                    By signing up or logging in, you consent to Safarly's{" "}
                                    <Link href="/terms" className="text-emerald-300/80 hover:text-emerald-300 underline-offset-2 hover:underline">
                                        Terms of Use
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-emerald-300/80 hover:text-emerald-300 underline-offset-2 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </label>
                            </div>

                            {/* Submit Button - Enhanced */}
                            <div className="pt-2">
                                <PrimaryButton
                                    type="submit"
                                    className="w-full py-2! px-4"
                                >
                                    Sign In as {role === "company" ? "Company" : "Traveller"}
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* ── DIVIDER WITH GOOGLE/APPLE BUTTONS ── */}
                        <div className="my-6">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-emerald-400/15"></div>
                                </div>
                                <div className="relative flex justify-center space-x-4">
                                    {/* Google Button - Enhanced */}
                                    <button
                                        type="button"
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-emerald-400/30 bg-black/50 transition-all hover:bg-emerald-400/15 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(74,171,100,0.1)]"
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                    </button>

                                    {/* Apple Button - Enhanced */}
                                    <button
                                        type="button"
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-emerald-400/30 bg-black/50 transition-all hover:bg-emerald-400/15 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(74,171,100,0.1)]"
                                    >
                                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.04 3.83-.68 1.53.38 2.64 1.15 3.33 2.63-2.95 1.82-2.29 5.78.76 6.27-.66 1.86-1.64 3.7-3 4.01zM11.43 7.3c-.39-2.9 2.16-5.2 4.46-5.38.24 2.86-2.46 5.24-4.46 5.38z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-[11px] text-emerald-300/50">
                            New here?{" "}
                            <Link href="/signup" className="text-emerald-300/70 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
        </section>
    );
};

export default LoginPage;