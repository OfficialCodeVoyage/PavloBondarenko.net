import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import JsonLd from './components/JsonLd';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pavlo Bondarenko - Product & AI",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="en">
        <head>
          {/* Resource hints for performance */}
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
          />
          {/* FontAwesome removed - using Iconoir icons instead */}
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