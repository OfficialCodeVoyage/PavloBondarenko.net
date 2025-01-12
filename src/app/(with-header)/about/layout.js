import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Pavlo Bondarenko - Hello World",
};

export default function AboutLayout({ children }) {
    return (
            <main className="main-aboutpage">
                {children}
            </main>
    );
}
