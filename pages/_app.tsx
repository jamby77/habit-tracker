import { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { AuthProvider } from "../lib/auth";
import { HabitProvider } from "../lib/HabitProvider";
import { LayoutProvider } from "../lib/layout";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LayoutProvider>
      <AuthProvider>
        <HabitProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HabitProvider>
      </AuthProvider>
    </LayoutProvider>
  );
};

export default App;
