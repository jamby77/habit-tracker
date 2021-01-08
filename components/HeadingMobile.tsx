import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Plus from "../svg/plus";

const HeadingMobile: React.FC = () => {
  return (
    <div className="bg-white shadow-lg flex flex-row justify-between px-4 py-2 items-center sm:px-8 sm:py-4">
      <Link href={"/"}>
        <a title="Dashboard">
          <Logo />
        </a>
      </Link>
      <nav className="flex flex-row gap-10">
        <Link href="/weekly">
          <a>Weekly</a>
        </Link>{" "}
        <Link href="/monthly">
          <a>Monthly</a>
        </Link>
        <Link href="/signin">
          <a>Sign In/Up</a>
        </Link>
      </nav>
      <button className="active:bg-green-50 focus:outline-white w-12 h-12 flex items-center justify-center flex-grow-0 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50 rounded-full">
        <span className="w-8 h-8 text-green-600">
          <Plus className="stroke-current fill-current" />
        </span>
      </button>
    </div>
  );
};

export default HeadingMobile;
