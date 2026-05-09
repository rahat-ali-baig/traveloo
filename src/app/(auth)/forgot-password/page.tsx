"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/core/PrimaryButton";
import ForgotPasswordSvg from "@/components/svgs/ForgotPasswordSvg";

const ForgotPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handleResend = () => {
        // Resend logic
        alert("Reset link resent to your email");
    };

    return (
        <section className="relative flex h-screen w-full overflow-hidden">
            {/* LEFT SIDEBAR - PATTERN */}
            <div className="hidden lg:block lg:w-1/2 relative h-screen overflow-hidden z-10 bg-[#050505]">
                <ForgotPasswordSvg />

                <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b z-20 from-transparent via-emerald-400/40 to-transparent" />
            </div>

            {/* RIGHT PANEL - FORGOT PASSWORD FORM */}
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

                        {/* Header */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-semibold text-white">Reset Password</h2>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-300/60 mt-1">
                                {isSubmitted ? "Check your email" : "Enter your email address"}
                            </p>
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-emerald-300/50">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-emerald-400/15 bg-black/70 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-emerald-300/20 focus:border-emerald-400/50 focus:bg-black/90 focus:ring-1 focus:ring-emerald-400/30"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <PrimaryButton
                                    type="submit"
                                    className="w-full py-2! px-4"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </PrimaryButton>
                            </form>
                        ) : (
                            /* Success State */
                            <div className="py-4 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                                        <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="text-sm text-emerald-300/70">
                                    We've sent a password reset link to <span className="text-white font-medium">{email}</span>
                                </p>
                                <button
                                    onClick={handleResend}
                                    className="mt-4 text-xs text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline"
                                >
                                    Didn't receive it? Resend
                                </button>
                            </div>
                        )}

                        {/* Back to Sign In */}
                        <p className="mt-6 text-center text-[11px] text-emerald-300/50">
                            Remember your password?{" "}
                            <Link href="/login" className="text-emerald-300/70 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPage;