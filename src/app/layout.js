import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';

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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"/>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {children}
        </body>
        </html>
    );
}
