import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Cafe Finder", template: "%s · Cafe Finder" },
  description: "Find laptop-friendly cafes near you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <Providers>
          <Header />
          {/* bottom padding keeps content clear of the mobile tab bar */}
          <main className="flex flex-1 flex-col pb-16 md:pb-0">{children}</main>
          <TabBar />
        </Providers>
      </body>
    </html>
  );
}
