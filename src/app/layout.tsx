// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Haftası",
  description: "Next.js + Tailwind + React Query + shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white`}
        style={{
          backgroundImage: "url('/orumcek.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Koyu overlay – yazıları okunur yapar */}
        <div className="fixed inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80 -z-10" />

        {/* İçerik */}
        <Providers>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
