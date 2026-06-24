import type { AppProps } from "next/app";
import { CartProvider } from "@/entities/cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
