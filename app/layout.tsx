import "./globals.css"
import type { Metadata } from "next"
import { Mada } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils"
import { ModalProvider } from "@/components/providers/modal-provider"
import { SocketProvider } from "@/components/providers/socket-provider"

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
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="famChat"
          >
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
