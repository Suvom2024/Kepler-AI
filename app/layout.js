import { Inter } from "next/font/google"
import PrelineScript from "@/components/PrelineScript"
import "./globals.css"
import UploadModal from "@/components/upload-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kepler AI",
  description: "By Reader AI Team",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#e8f4fd]`}>{children}</body>
      <PrelineScript />
    </html>
  )
}
