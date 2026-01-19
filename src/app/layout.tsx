import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "풀밭서리단",
  description: "풀밭서리단 서비스",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "풀밭서리단",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "풀밭서리단",
    description: "농산물 가격 비교 서비스 - 농산물의 평균 소매가 및 대형마트 가격을 한눈에 비교하여 스마트한 쇼핑을 즐기세요.",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "풀밭서리단",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "풀밭서리단",
    description: "농산물 가격 비교 서비스 - 농산물의 평균 소매가 및 대형마트 가격을 한눈에 비교하여 스마트한 쇼핑을 즐기세요.",
    images: ["/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
