import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartProvider from "@/components/cart/CartProvider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://uli.com.my"
  ),
  title: {
    default: "United U-LI Corporation Berhad – Engineering Tomorrow's Infrastructure",
    template: "%s – United U-LI Corporation Berhad",
  },
  description:
    "Malaysia's leading manufacturer of ISO-certified Cable Support Systems. Trusted across ASEAN and international markets since 1978.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "United U-LI Corporation Berhad",
    title: "United U-LI Corporation Berhad – Engineering Tomorrow's Infrastructure",
    description:
      "Malaysia's leading manufacturer of ISO-certified Cable Support Systems. Trusted across ASEAN and international markets since 1978.",
  },
  twitter: { card: "summary_large_image" },
  robots:
    process.env.NODE_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
