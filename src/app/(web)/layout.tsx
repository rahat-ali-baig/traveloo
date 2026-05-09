import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Safarly | Pakistan's Trusted Travel Marketplace",
    description: "Safarly | Pakistan's Trusted Travel Marketplace",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-481 mx-auto w-full border-l border-r border-white/10 bg-black">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
