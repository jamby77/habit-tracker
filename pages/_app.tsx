import { AppProps } from "next/app";
import { LayoutProvider } from "../lib/layout";
import Layout from "../components/Layout";

import "../styles/global.css";
import { AuthProvider } from "../lib/auth";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    </AuthProvider>
  );
};

export default App;
