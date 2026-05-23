import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in",
  description: "Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping & Cash on Delivery Available.",
  icons: {
    icon: "https://www.amazon.in/favicon.ico",
    shortcut: "https://www.amazon.in/favicon.ico",
    apple: "https://www.amazon.in/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} flex min-h-screen flex-col bg-[#EAEDED]`}
      >
        <ReduxProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
