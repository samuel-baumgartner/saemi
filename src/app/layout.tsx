import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samuel",
  description: "Samuel Baumgartner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

