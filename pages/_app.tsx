import { AppProps } from "next/app";
import { ProvideAuth } from "../lib/auth";
import { ProviderLayout } from "../lib/layout";
import Layout from "../components/Layout";

import "../styles/global.css";

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
