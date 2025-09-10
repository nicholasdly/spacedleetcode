import type { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export const metadata: Metadata = {
  title: "Anko",
  description: "Spaced repetition applied to Leetcode problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NuqsAdapter>
            {children}
            <Toaster theme="light" position="bottom-center" richColors />
          </NuqsAdapter>
        </body>
      </html>
    </ClerkProvider>
  );
}
