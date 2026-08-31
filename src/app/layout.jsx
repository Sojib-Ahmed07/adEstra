import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export const metadata = {
    title: "adEstra — Digital Partner & Creative Agency",
    description:
        "From Concept to Creation — Beautiful design, web development, marketing, and AI services.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${poppins.className} bg-white text-slate-950 selection:bg-[#22e3ad] selection:text-black antialiased min-h-screen flex flex-col`}
            >
                <SmoothScroll>

                    <div className="relative z-10 flex flex-col min-h-screen w-full">

                        {/* Global Navbar */}
                        <Navbar />

                        {/* Main Content */}
                        <main className="flex-grow w-full">
                            {children}
                        </main>

                        {/* Footer */}
                        <Footer />

                    </div>

                </SmoothScroll>
            </body>
        </html>
    );
}