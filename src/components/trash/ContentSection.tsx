"use client";

import { motion } from "framer-motion";

export default function ContentSection() {
  return (
    <div className="w-full bg-white relative z-20">
      {/* Hero Tagline */}
      <div className="text-center py-32 px-6">
        <h2 className="text-3xl md:text-6xl font-light text-gray-900 leading-tight tracking-tight">
          Every destination tells
          <br />
          <strong className="font-black">a story worth living.</strong>
        </h2>
        <p className="mt-5 text-sm text-gray-400 font-semibold tracking-wide">
          Curated journeys crafted for the curious traveller
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex items-center gap-2 px-10 py-4 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-gray-800 transition-colors group"
        >
          Explore Destinations
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Destination Grid */}
      <DestinationGrid />

      {/* Stats Bar */}
      <StatsBar />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function DestinationGrid() {
  const destinations = [
    {
      name: "Maldives",
      region: "South Asia",
      description: "Crystal waters, infinite sky",
      gradient: "from-sky-500 to-teal-800",
      delay: 0.1,
    },
    {
      name: "Sahara",
      region: "Africa",
      description: "Where silence roars",
      gradient: "from-amber-600 to-amber-900",
      delay: 0.2,
    },
    {
      name: "Patagonia",
      region: "South America",
      description: "Wild beyond imagination",
      gradient: "from-green-600 to-green-900",
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      {destinations.map((dest, idx) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: dest.delay }}
          className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
        >
          <div className={`w-full h-full bg-gradient-to-br ${dest.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity group-hover:opacity-90" />
          <div className="absolute bottom-0 left-0 right-0 p-7 z-20 text-white">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
              {dest.region}
            </div>
            <div className="text-3xl font-black leading-tight tracking-tight mt-1">
              {dest.name}
            </div>
            <div className="text-xs opacity-65 mt-1.5">{dest.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StatsBar() {
  const stats = [
    { number: "140+", label: "Countries" },
    { number: "12k", label: "Journeys Crafted" },
    { number: "98%", label: "Happy Travellers" },
    { number: "24/7", label: "Travel Support" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-100">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="py-12 px-4 text-center border-r last:border-r-0 border-gray-100"
        >
          <div className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">
            {stat.number}
          </div>
          <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 mt-1.5">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CTASection() {
  return (
    <div className="w-full bg-black py-28 px-6 text-center">
      <h2 className="text-4xl md:text-8xl font-black text-white leading-none tracking-tighter">
        Your next
        <br />
        adventure starts
        <br />
        <em className="not-italic text-teal-100">right now.</em>
      </h2>
      <p className="mt-5 text-sm text-white/30 tracking-wider">
        Join 12,000+ travellers who chose Traveloo
      </p>
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#e5e7eb" }}
        whileTap={{ scale: 0.98 }}
        className="mt-12 inline-block px-14 py-5 bg-white text-black text-[11px] font-extrabold tracking-[0.25em] uppercase rounded-sm transition-all"
      >
        Start Planning
      </motion.button>
    </div>
  );
}

function Footer() {
  const links = ["Destinations", "Experiences", "About", "Contact"];

  return (
    <footer className="w-full py-10 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 gap-4">
      <div className="text-xl font-black tracking-tighter">Traveloo</div>
      <div className="flex gap-8">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[11px] font-bold tracking-[0.12em] uppercase text-gray-400 hover:text-black transition"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
