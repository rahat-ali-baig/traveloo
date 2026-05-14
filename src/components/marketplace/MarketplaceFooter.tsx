import Link from "next/link";

const FOOTER_LINKS = ["Trust Center", "Agency Terms", "Traveler Safety", "Help"];

const MarketplaceFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020302]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-4 py-6 text-xs text-white/38 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Safarly Marketplace - verified trips, real stories, safer bookings.</p>
        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((link) => (
            <Link key={link} href="#" className="transition hover:text-emerald-300">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
