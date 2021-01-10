import React from "react";
import Head from "next/head";
import { useLayout } from "../lib/layout";
import HeadingMobile from "./HeadingMobile";
import Messages from "./Messages";

const Layout: React.FC = ({ children }) => {
  const { title } = useLayout();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingMobile />
      <Messages />
      <main className="flex flex-col w-full h-full bg-red-50">{children}</main>
    </>
  );
};

export default Layout;
