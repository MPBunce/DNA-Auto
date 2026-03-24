import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://www.dnaautosource.com"),
  title: "DNA Auto Source",
  description: "Your Premier Destination for all things Automotive",
  openGraph: {
    title: "DNA Auto Source",
    description: "Your Premier Destination for all things Automotive",
    url: "https://www.dnaautosource.com",
    siteName: "DNA Auto Source",
    images: [
      {
        url: "/DNALogo-1.PNG",
        width: 1200,
        height: 630,
        alt: "DNA Auto Source",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DNA Auto Source",
    description: "Your Premier Destination for all things Automotive",
    images: ["/DNALogo-1.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
