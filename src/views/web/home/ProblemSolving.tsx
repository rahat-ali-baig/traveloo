"use client";

import PrimaryButton from "@/components/core/PrimaryButton";

const ProblemSolving = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#030805]">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-emerald-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            </div>

            <div className="relative z-10 w-full border-t border-b border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* The Problem */}
                    <div className="p-10 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-red-400/80 mb-6 flex items-center gap-3">
                            <span className="w-4 h-px bg-red-400/40" /> The Problem
                        </span>
                        <h2 className="text-3xl md:text-5xl font-poppins font-light text-white mb-8">
                            Travel booking is currently a <span className="font-semibold text-red-200">mess of WhatsApp groups.</span>
                        </h2>
                        
                        <div className="space-y-6">
                            {[
                                "Hidden fees and arbitrary price changes.",
                                "No verified reviews, only word-of-mouth.",
                                "Zero accountability if an operator cancels."
                            ].map((prob, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 text-[10px]">✕</div>
                                    <p className="text-white/60 font-light text-sm leading-relaxed">{prob}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* The Solution */}
                    <div className="p-10 lg:p-20 flex flex-col justify-center bg-emerald-950/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-emerald-900/20 to-transparent opacity-50" />
                        
                        <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] text-emerald-400/80 mb-6 flex items-center gap-3">
                            <span className="w-4 h-px bg-emerald-400/40" /> The Solution
                        </span>
                        <h2 className="relative z-10 text-3xl md:text-5xl font-poppins font-light text-white mb-8">
                            A completely <span className="font-semibold text-emerald-300">transparent marketplace.</span>
                        </h2>
                        
                        <div className="relative z-10 space-y-6">
                            {[
                                "Fixed, upfront pricing guaranteed by the platform.",
                                "Authentic reviews from verified past travelers.",
                                "Escrow-style holding to ensure operators deliver."
                            ].map((sol, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 text-[10px]">✓</div>
                                    <p className="text-white/60 font-light text-sm leading-relaxed">{sol}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolving;
