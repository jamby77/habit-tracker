import React from "react";
import Head from "next/head";
import { useLayout } from "../lib/layout";
import HeadingMobile from "./HeadingMobile";

const Layout: React.FC = ({ children }) => {
  const { title } = useLayout();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingMobile />
      <main className="flex flex-col h-screen container bg-red-50">
        {children}
      </main>
    </>
  );
};

export default Layout;
