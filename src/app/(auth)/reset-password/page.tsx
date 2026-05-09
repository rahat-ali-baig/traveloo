"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/core/PrimaryButton";
import ResetSvg from "@/components/svgs/ResetSvg";

const ResetPasswordPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }, 1500);
    };

    return (
        <section className="relative flex h-screen w-full overflow-hidden">
            {/* LEFT SIDEBAR - PATTERN */}
            <div className="hidden lg:block lg:w-1/2 relative h-screen overflow-hidden z-10 bg-[#050505]">
                <ResetSvg />

                <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b z-20 from-transparent via-emerald-400/40 to-transparent" />
            </div>

            {/* RIGHT PANEL - RESET PASSWORD FORM */}
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
                            <h2 className="text-2xl font-semibold text-white">Create New Password</h2>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-300/60 mt-1">
                                Secure your account
                            </p>
                        </div>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* New Password */}
                                <div>
                                    <label className="mb-1.5 block text-[8.5px] uppercase tracking-[0.35em] text-emerald-300/50">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                            className="w-full rounded-xl border border-emerald-400/15 bg-black/70 py-3.5 px-4 pr-11 text-[13px] text-white placeholder-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-black/90 focus:ring-1 focus:ring-emerald-400/30"
                                            required
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

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-1.5 block text-[8.5px] uppercase tracking-[0.35em] text-emerald-300/50">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                            className="w-full rounded-xl border border-emerald-400/15 bg-black/70 py-3.5 px-4 pr-11 text-[13px] text-white placeholder-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-black/90 focus:ring-1 focus:ring-emerald-400/30"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/40 hover:text-emerald-400/80 transition-colors"
                                        >
                                            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                                                <ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1" />
                                                {showConfirmPassword ? (
                                                    <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                                ) : (
                                                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <PrimaryButton
                                        type="submit"
                                        className="w-full py-2! px-4"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Resetting..." : "Reset Password"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        ) : (
                            /* Success State */
                            <div className="py-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                                        <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Password Reset Successful</h3>
                                <p className="text-sm text-emerald-300/70 mb-6">
                                    Your password has been successfully updated. Redirecting you to login...
                                </p>
                                <Link href="/login">
                                    <PrimaryButton className="w-full py-2! px-4">
                                        Go to Login
                                    </PrimaryButton>
                                </Link>
                            </div>
                        )}

                        {/* Back to Sign In (only show if not successful) */}
                        {!isSuccess && (
                            <p className="mt-6 text-center text-[11px] text-emerald-300/50">
                                Remembered your password?{" "}
                                <Link href="/login" className="text-emerald-300/70 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
