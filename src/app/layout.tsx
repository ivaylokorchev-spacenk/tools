import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tools",
  description: "Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          {children}
        <footer className="px-24 text-center py-10 flex items-center justify-center bg-slate-800 text-white">
          <p>Any questions or feedback feel free to <a className="underline" href="mailto:ivaylo.korchev@spacenk.com">email me - ivaylo.korchev@spacenk.com</a></p>
        </footer>
        </body>
    </html>
  );
}
