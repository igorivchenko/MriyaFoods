import type { AppProps } from "next/app";
import { CartProvider } from "@/entities/cart";
import { StoreProvider } from "@/app/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </StoreProvider>
  );
}
