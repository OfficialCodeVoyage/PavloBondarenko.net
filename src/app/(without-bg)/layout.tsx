import type { Metadata } from 'next';
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorBoundary from "@/app/components/ErrorBoundary";

export const metadata: Metadata = {
    title: "Pavlo Bondarenko - Hello World!",
};

export default function WithoutBgLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <ErrorBoundary>
            <Header />
            {children}
            <Footer />
        </ErrorBoundary>
    );
}