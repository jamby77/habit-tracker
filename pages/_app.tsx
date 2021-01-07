import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { ProvideAuth } from "../lib/auth";
import { ProviderLayout } from "../lib/layout";
import Layout from "../components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideAuth>
      <ProviderLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProviderLayout>
    </ProvideAuth>
  );
};

export default App;
