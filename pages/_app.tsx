import { AppProps } from "next/app";
import { LayoutProvider } from "../lib/layout";
import Layout from "../components/Layout";

import "../styles/global.css";
import { AuthProvider } from "../lib/auth";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LayoutProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </LayoutProvider>
  );
};

export default App;
