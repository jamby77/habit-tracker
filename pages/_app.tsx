import { AppProps } from "next/app";
import { ProviderLayout } from "../lib/layout";
import Layout from "../components/Layout";

import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ProviderLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProviderLayout>
  );
};

export default App;
