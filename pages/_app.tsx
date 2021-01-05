import { AppProps } from "next/app";
import "../styles/globals.css";
import { ProvideAuth } from "../lib/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />;
    </ProvideAuth>
  );
}

export default MyApp;
