import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { ClientSessionProvider } from "@/components/providers/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Tools for Marketers",
  description: "Discover the best AI tools for marketing professionals",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
          <AuthProvider>{children}</AuthProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
