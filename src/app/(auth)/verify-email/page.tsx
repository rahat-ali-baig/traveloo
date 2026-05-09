"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/core/PrimaryButton";

const VerifyPage = () => {
    const router = useRouter();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [mounted, setMounted] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(30);

    // Create refs for each input
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setMounted(true);
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input using refs
        if (value && index < 5) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join("");
        if (fullCode.length === 6) {
            router.push("/dashboard");
        } else {
            alert("Please enter all 6 digits");
        }
    };

    const handleResend = () => {
        if (timer > 0) return;
        setIsResending(true);
        setTimer(30);
        setTimeout(() => setIsResending(false), 1000);
    };

    return (
        <section className="relative flex h-screen w-full overflow-hidden">
            <div className="hidden lg:block lg:w-1/2 relative h-screen overflow-hidden z-10 bg-[#050505]">
                <svg
                    className="absolute inset-0 w-full h-full opacity-40"
                    viewBox="0 0 900 900"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="geo-pattern"
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            patternUnits="userSpaceOnUse"
                        >
                            {/* Quarter Circle */}
                            <path d="M 50 0 A 50 50 0 0 1 100 50 L 100 0 Z" fill="currentColor" className="text-emerald-500/20" />
                            {/* Triangle */}
                            <path d="M 0 50 L 50 100 L 0 100 Z" fill="currentColor" className="text-emerald-400/10" />
                            {/* Small Circle */}
                            <circle cx="75" cy="75" r="15" fill="currentColor" className="text-emerald-300/30" />
                            {/* Square */}
                            <rect x="10" y="10" width="20" height="20" fill="currentColor" className="text-emerald-400/20" />
                        </pattern>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#geo-pattern)" />
                </svg>

                <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b z-20 from-transparent via-emerald-400/40 to-transparent" />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20 relative z-10">
                <div
                    className={`w-full max-w-[440px] transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                >
                    {/* Glass Card */}
                    <div
                        className="relative overflow-hidden rounded-3xl border border-emerald-400/20 p-8 shadow-2xl"
                        style={{
                            background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        {/* Glow edges */}
                        <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />
                        <div className="pointer-events-none absolute bottom-0 left-[30%] right-[30%] h-px bg-linear-to-r from-transparent via-emerald-400/20 to-transparent" />
                        <div className="pointer-events-none absolute left-0 top-[20%] bottom-[20%] w-px bg-linear-to-b from-transparent via-emerald-400/10 to-transparent" />

                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-semibold text-white">Verify your email</h2>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-300/60 mt-1">
                                We've sent a code to your email
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* OTP Input */}
                            <div>
                                <label className="mb-3 block text-[8.5px] uppercase tracking-[0.35em] text-emerald-300/50 text-center">
                                    Enter 6-digit verification code
                                </label>
                                <div className="flex justify-center gap-2">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="w-10 h-12 rounded-xl border border-emerald-400/15 bg-black/70 text-center text-lg text-white outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-black/90 focus:ring-1 focus:ring-emerald-400/30"
                                            required
                                            autoComplete="off"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <PrimaryButton
                                    type="submit"
                                    className="w-full py-2! px-4"
                                >
                                    Verify Account
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* ── RESEND CODE ── */}
                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={timer > 0}
                                className={`text-[11px] transition-colors ${timer > 0
                                    ? "text-emerald-300/30 cursor-not-allowed"
                                    : "text-emerald-300/70 hover:text-emerald-300"
                                    }`}
                            >
                                {timer > 0
                                    ? `Resend code in ${timer}s`
                                    : "Didn't receive the code? Resend"
                                }
                            </button>
                        </div>

                        <p className="mt-6 text-center text-[11px] text-emerald-300/50">
                            <Link href="/login" className="text-emerald-300/70 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">
                                Back to Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyPage;