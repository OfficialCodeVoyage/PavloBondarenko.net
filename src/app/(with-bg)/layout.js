import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter } from 'next/font/google';
import Background from "@/app/components/Background/Background";
import AppWrapper from "@/app/components/Preloader/AppWrapper";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ['latin'], // Подмножества
  weights: ['400', '500', '600', '700'], // Нужные веса
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: "Pavlo Bondarenko - Hello World!",
};

export default function WithBgLayout({ children }) {
    return (
        <AppWrapper>
            <Background />
            <h3 id="coords"></h3>
            <Header />
            {children}
            <Footer />
            <Analytics />
        </AppWrapper>
    );
}