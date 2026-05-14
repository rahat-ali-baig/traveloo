import Link from "next/link";

const COPYRIGHT_YEAR = 2026;

const Footer = () => {
    return (
        <footer className="w-full relative overflow-hidden bg-[#010302] pt-20 pb-10">
            {/* Top gradient separator instead of a harsh border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

            {/* Subtle background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[300px] bg-emerald-950/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="inline-block mb-6">
                                <h2 className="text-3xl font-bold text-white tracking-tight">Safarly<span className="text-emerald-500">.</span></h2>
                            </Link>
                            <p className="text-sm text-white/50 leading-relaxed font-light max-w-sm">
                                The first trusted marketplace for booking travel and tours in Pakistan. Verifiable, reliable, and entirely transparent.
                            </p>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <div className="flex flex-wrap gap-3">
                                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                                    <a key={social} href="#" className="text-[11px] font-medium text-emerald-400/60 hover:text-emerald-400 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
                        {/* Column 1 */}
                        <div>
                            <h3 className="text-[10px] text-white uppercase tracking-[0.2em] mb-6 font-semibold">Explore</h3>
                            <ul className="space-y-4">
                                {['Destinations', 'Popular Trips', 'Tour Operators', 'Travel Guides'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block font-light">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h3 className="text-[10px] text-white uppercase tracking-[0.2em] mb-6 font-semibold">Company</h3>
                            <ul className="space-y-4">
                                {['About Us', 'Careers', 'Partner with us', 'Press'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block font-light">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h3 className="text-[10px] text-white uppercase tracking-[0.2em] mb-6 font-semibold">Legal</h3>
                            <ul className="space-y-4">
                                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Refunds'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block font-light">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40 font-light">
                    <p>&copy; {COPYRIGHT_YEAR} Safarly. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <p>Made with</p>
                        <span className="text-emerald-500">♥</span>
                        <p>in Pakistan</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
