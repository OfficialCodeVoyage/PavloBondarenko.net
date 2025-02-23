import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import styles from './not-found.module.css'
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({
    subsets: ['latin'],
    weights: ['400', '500', '600', '700'],
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
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    );
  }