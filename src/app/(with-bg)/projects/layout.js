import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "../../globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Pavlo Bondarenko - My Projects",
  description: "Explore my portfolio of projects spanning software engineering and product management.",
}

export default function ProjectsLayout({ children }) {
  return <main className={`main-projectspage ${geistSans.variable} ${geistMono.variable}`}>{children}</main>
}

