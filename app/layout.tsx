import type { Metadata } from "next";
import { Poppins, Montserrat, Orbitron } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blackwill Properties - Find Your Dream Home",
  description: "Discover the best real estate deals with Blackwill Properties. Buy, sell, or rent properties with ease and confidence.",
  keywords: "real estate, properties, buy house, rent home, Blackwill Properties, dream home, real estate deals",
  robots: "index, follow", // Allows search engines to index and follow links
  other: {
    "google-site-verification": "cqX0KKCzoNrMeInEwFDoo_pGrtX_MP_v1R0K87b7Dsw",
  },
  openGraph: {
    title: "Blackwill Properties - Find Your Dream Home",
    description: "Explore the best real estate deals with Blackwill Properties. Find, buy, or rent properties easily.",
    url: "https://www.blackwill.co.tz",
    siteName: "Blackwill Properties",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blackwill Properties - Find Your Dream Home",
    description: "Explore the best real estate deals. Buy, sell, or rent properties easily.",
  },
  alternates: {
    canonical: "https://www.blackwill.co.tz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.className} ${orbitron.variable}  antialiased`}
      >
        <Providers >

        <Header />
        {children}
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
