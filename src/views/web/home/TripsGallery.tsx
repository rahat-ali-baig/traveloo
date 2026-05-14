"use client";

import PrimaryButton from "@/components/core/PrimaryButton";
import Image from "next/image";

const TRIPS = [
    {
        title: "Hunza Valley Expedition",
        operator: "Alpine Trekkers",
        days: 7,
        price: "Rs. 45,000",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Fairy Meadows Trek",
        operator: "North Explore",
        days: 5,
        price: "Rs. 32,000",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Skardu Autumn Tour",
        operator: "Discover PK",
        days: 6,
        price: "Rs. 50,000",
        image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Swat & Kalam Explorer",
        operator: "Valley Tours",
        days: 4,
        price: "Rs. 25,000",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop"
    }
];

const TripsGallery = () => {
    return (
        <section className="w-full border-b border-white/10 bg-[#020503]">
            <div className="grid grid-cols-1 lg:grid-cols-4">
                {/* Left sidebar / Title */}
                <div className="col-span-1 border-r border-white/10 p-10 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400/60 mb-4 block">Explore</span>
                        <h2 className="text-3xl font-poppins font-medium text-white mb-6">Trending Trips</h2>
                        <p className="text-sm font-light text-white/50 mb-8 leading-relaxed">
                            Discover the most sought-after adventures vetted by the Safarly community.
                        </p>
                    </div>
                    <div>
                        <PrimaryButton>View All Trips</PrimaryButton>
                    </div>
                </div>

                {/* Grid Gallery */}
                <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2">
                    {TRIPS.map((trip, i) => (
                        <div key={i} className={`group relative h-80 border-b border-white/10 ${i % 2 === 0 ? 'md:border-r' : ''} border-white/10 overflow-hidden cursor-pointer`}>
                            {/* Bg Image */}
                            <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src={trip.image}
                                    alt={trip.title}
                                    fill
                                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 38vw"
                                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-medium mb-2">{trip.operator}</p>
                                        <h3 className="text-xl font-medium text-white mb-1 group-hover:text-emerald-300 transition-colors">{trip.title}</h3>
                                        <p className="text-xs text-white/60">{trip.days} Days</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-white">{trip.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TripsGallery;
