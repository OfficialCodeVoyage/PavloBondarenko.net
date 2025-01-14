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
    title: "Projects",
};

export default function WorkLayout({ children }) {
    return (
        <main className="main-workspage">
            {children}
        </main>
    );
}
