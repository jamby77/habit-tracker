import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import Plus from "../svg/plus";
import Logo from "./Logo";

const HeadingMobile: React.FC = () => {
  const { user, signout } = useAuth();
  return (
    <div className="HeadingMobile bg-white shadow-lg flex flex-row justify-between px-4 py-2 items-center sm:px-8 sm:py-4">
      <Link href={"/"}>
        <a title="Dashboard">
          <Logo />
        </a>
      </Link>
      <nav className="flex flex-row gap-10">
        <Link href="/">
          <a>Home</a>
        </Link>
        {user && (
          <>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>{" "}
            <Link href="/weekly">
              <a>Weekly</a>
            </Link>{" "}
            <Link href="/monthly">
              <a>Monthly</a>
            </Link>
          </>
        )}
        {!user ? (
          <Link href="/signin">
            <a>Sign In/Up</a>
          </Link>
        ) : (
          <button onClick={() => signout()}>Sign Out</button>
        )}
      </nav>
      {user && (
        <Link href={"/habits/add"}>
          <a className="active:bg-green-50 focus:outline-white w-12 h-12 flex items-center justify-center flex-grow-0 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50 rounded-full">
            <span className="w-8 h-8 text-green-600">
              <Plus className="stroke-current fill-current" />
            </span>
          </a>
        </Link>
      )}
    </div>
  );
};

export default HeadingMobile;
