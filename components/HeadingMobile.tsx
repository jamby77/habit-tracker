import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Plus from "../svg/plus";
import { useAuth } from "../lib/auth";

const HeadingMobile: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="bg-white shadow-lg flex flex-row justify-between px-4 py-2 items-center sm:px-8 sm:py-4">
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
          <Link href="/signout">
            <a>Sign Out</a>
          </Link>
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
