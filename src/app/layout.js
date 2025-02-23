import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './not-found.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';


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
          {/* Bootstrap JS bundle */}
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka07A0dnnN7lAiHR2LgK+qVw1y4myv4sS6KME6bj2y0e5lwPq5La5lb7RVN5cw5N"
            crossOrigin="anonymous"
            defer
          ></script>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </html>
    );
  }