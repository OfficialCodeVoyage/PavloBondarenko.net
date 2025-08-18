import type { Metadata } from 'next';
import "../globals.css";
// Bootstrap is imported in root layout
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "@/app/components/Background/Background";
import AppWrapper from "@/app/components/Preloader/AppWrapper";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
    title: "Pavlo Bondarenko - Hello World!",
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