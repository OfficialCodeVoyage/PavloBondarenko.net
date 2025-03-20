import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import styles from './not-found.module.css'
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import JsonLd from './components/JsonLd';


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
    description: "Personal website of Pavlo Bondarenko - Full-stack developer & tech enthusiast. Explore my projects, skills, and professional journey.",
    keywords: ["Pavlo Bondarenko", "full-stack developer", "software engineer", "web development", "portfolio", "projects"],
    authors: [{ name: "Pavlo Bondarenko" }],
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://pavlobondarenko.net",
        title: "Pavlo Bondarenko - Hello World!",
        description: "Personal website of Pavlo Bondarenko - Full-stack developer & tech enthusiast. Explore my projects, skills, and professional journey.",
        siteName: "Pavlo Bondarenko",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pavlo Bondarenko - Hello World!",
        description: "Personal website of Pavlo Bondarenko - Full-stack developer & tech enthusiast. Explore my projects, skills, and professional journey.",
    },
    icons: {
        icon: '/favicon.ico',
    },
    metadataBase: new URL("https://pavlobondarenko.net"),
};

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
          />
          <link rel="canonical" href="https://pavlobondarenko.net" />
          <meta name="google-site-verification" content="your-verification-code" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
          <SpeedInsights />
          <JsonLd />
        </body>
      </html>
    );
  }