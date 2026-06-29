import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import { ToastProvider, StoreProvider, ThemeSync } from "./providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ScrollToTop } from "@/features/scroll-to-top";
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
    <html
      lang="en"
      className={`${roboto.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const persistThemeRaw = localStorage.getItem('persist:mriyafoods-theme');
                  let theme = null;
                  if (persistThemeRaw) {
                    const parsedPersist = JSON.parse(persistThemeRaw);
                    if (parsedPersist.theme) {
                      theme = JSON.parse(parsedPersist.theme);
                    }
                  }
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error reading theme from localStorage', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <StoreProvider>
          <ThemeSync />
          <ToastProvider />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
