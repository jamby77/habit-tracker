import { AppProps } from "next/app";
import { LayoutProvider } from "../lib/layout";
import Layout from "../components/Layout";

import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
};

export default App;
