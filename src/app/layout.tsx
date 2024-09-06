import type { Metadata } from "next";
import "./globals.css";
import { ubuntu } from "@/ui/fonts/fonts";

export const metadata: Metadata = {
  title: "PH-Studio",
  description: "Blog created in M426",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
