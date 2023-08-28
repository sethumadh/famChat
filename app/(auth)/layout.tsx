import type { Metadata } from "next"
import { Mada } from "next/font/google"

const font = Mada({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FamChat App",
  description: "A chat application for families",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className=" flex items-center justify-center h-full">{children}</div>
}
