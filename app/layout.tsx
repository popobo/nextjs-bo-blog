import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "Welcome to my personal blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-600 text-white p-4">
          <nav>{/* Add navigation items here */}</nav>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-green-600 text-white p-4 text-center">
          © 2023 My Blog. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
