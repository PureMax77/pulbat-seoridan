import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "풀밭서리단",
  description: "풀밭서리단 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
