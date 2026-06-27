import type { AppProps } from "next/app";
import { StoreProvider } from "@/app/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
