import { AppProps } from "next/app";
import React from "react";
import { Layout } from "~c/index";
import { AuthProvider } from "~l/auth";
import { HabitProvider } from "~l/HabitProvider";
import { LayoutProvider } from "~l/layout";
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
