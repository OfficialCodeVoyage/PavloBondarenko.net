import type { Metadata } from 'next';
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "@/app/components/Background/Background";
import AppWrapper from "@/app/components/Preloader/AppWrapper";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    default: "Pavlo Bondarenko | Associate Product Manager at Xe.com - Portfolio",
    template: "%s | Pavlo Bondarenko",
  },
  description: "Associate Product Manager specializing in product strategy, cloud solutions, and full-stack development. Portfolio featuring 76+ projects including AI, fintech, and healthcare solutions. 4 years of experience in product management and software engineering.",
  keywords: [
    "Pavlo Bondarenko",
    "Product Manager",
    "Associate Product Manager",
    "Xe.com",
    "Full-Stack Developer",
    "Cloud Solutions",
    "Portfolio",
    "React Developer",
    "Next.js",
    "Azure",
    "AWS",
    "GCP",
    "Product Strategy",
    "Denver Colorado",
    "Software Engineer"
  ],
  authors: [{ name: "Pavlo Bondarenko", url: "https://pavlobondarenko.net" }],
  creator: "Pavlo Bondarenko",
  publisher: "Pavlo Bondarenko",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://pavlobondarenko.net",
    siteName: "Pavlo Bondarenko Portfolio",
    title: "Pavlo Bondarenko | Product Manager & Developer",
    description: "Associate Product Manager at Xe.com with 4 years of experience in product strategy, cloud solutions, and full-stack development. View my portfolio of 76+ innovative projects.",
    images: [
      {
        url: "https://pavlobondarenko.net/images/LOGO/pavlopic3.png",
        width: 1200,
        height: 630,
        alt: "Pavlo Bondarenko - Product Manager & Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavlo Bondarenko | Product Manager & Developer",
    description: "Associate Product Manager at Xe.com. Building innovative products with tech expertise and creativity. 76+ projects in AI, fintech, and healthcare.",
    images: ["https://pavlobondarenko.net/images/LOGO/pavlopic3.png"],
    creator: "@pavlobondarenko",
    site: "@pavlobondarenko",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pavlobondarenko.net",
  },
  category: "portfolio",
};

export default function WithBgLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <AppWrapper>
            <ErrorBoundary>
                <Background />
                <h3 id="coords"></h3>
                <Header />
                {children}
                <Footer />
                <Analytics />
            </ErrorBoundary>
        </AppWrapper>
    );
}