import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topnav from "@/components/topnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hlass",
    description: "One-stop curriculum resource for Haas undergraduate students",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Topnav />
                <main className="flex min-h-screen w-screen flex-col items-center justify-center p-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
