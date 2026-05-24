import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import Topbar from "@/component/Header/Topbar";
import ScrollToTop from "@/component/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Well Physio — Advanced Physiotherapy & Medical Care",
  description:
    "Well Physio offers expert physiotherapy, rehabilitation, and specialized medical care. Book online appointments with our certified specialists for personalized treatment plans.",
  keywords: [
    "physiotherapy",
    "rehabilitation",
    "medical care",
    "doctor appointment",
    "physical therapy",
    "sports injury",
    "orthopedics",
  ],
  openGraph: {
    title: "Well Physio — Advanced Physiotherapy & Medical Care",
    description:
      "Expert physiotherapy, rehabilitation, and specialized medical care with online appointment booking.",
    type: "website",
    locale: "en_US",
    siteName: "Well Physio",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
