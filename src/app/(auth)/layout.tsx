import Header from "@/components/core/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth Pages | Safarly",
    description: "Auth Pages | Safarly",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
