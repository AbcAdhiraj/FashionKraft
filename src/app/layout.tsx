import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/hooks/useCart"
import { WishlistProvider } from "@/hooks/useWishlist"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://fashionkraft.com"),
  title: {
    default: "FashionKraft — Premium Boutique Fashion",
    template: "%s | FashionKraft",
  },
  description:
    "Discover premium boutique fashion at FashionKraft. Shop the latest trends in sarees, kurtis, dresses, lehengas, and more. India's premier fashion destination.",
  keywords: [
    "fashion",
    "boutique",
    "sarees",
    "kurtis",
    "dresses",
    "lehengas",
    "Indian fashion",
    "premium clothing",
    "FashionKraft",
  ],
  authors: [{ name: "FashionKraft" }],
  creator: "FashionKraft",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fashionkraft.com",
    siteName: "FashionKraft",
    title: "FashionKraft — Premium Boutique Fashion",
    description:
      "Discover premium boutique fashion at FashionKraft. Shop the latest trends in sarees, kurtis, dresses, lehengas, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FashionKraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FashionKraft — Premium Boutique Fashion",
    description:
      "Discover premium boutique fashion at FashionKraft. Shop the latest trends in sarees, kurtis, dresses, lehengas, and more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#FFFFF0]">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1 pt-16 md:pt-28">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={3000}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
