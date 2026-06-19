import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import { ToastProvider } from "./providers";
import { Header } from "@/widgets/header";
import "./styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mriya Foods — Premium E-Commerce Store",
  description:
    "A modern, high-performance e-commerce store featuring a pixel-perfect custom UI and stellar user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`}>
      <body>
        <ToastProvider />
        <Header />
        {children}
      </body>
    </html>
  );
}
