import Head from "next/head";
import React from "react";
import { useLayout } from "../lib/layout";
import HeadingMobile from "./HeadingMobile";
import Messages from "./Messages";

const Layout: React.FC = ({ children }) => {
  const { title } = useLayout();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Track your habits" />
        <meta
          property="og:description"
          content="Get a control over your existing habits or track new ones!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        <meta property="og:url" content="https://habits.jamby77.dev/" />
      </Head>
      <HeadingMobile />
      <Messages />
      <main className="flex flex-col w-full h-full bg-red-50">{children}</main>
    </>
  );
};

export default Layout;
