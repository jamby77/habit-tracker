import Link from "next/link";
import React from "react";
import { useAuth } from "~l/auth";
import Plus from "~s/plus";
import { Logo } from "./index";
import ProfileTop from "./ProfileTop";
import SmallDevicesNav from "./SmallDevicesNav";

const menu = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Weekly", path: "/weekly" },
  { label: "Monthly", path: "/monthly" },
];

const HeadingMobile: React.FC = () => {
  const {
    user: { user },
  } = useAuth();
  return (
    <header className="HeadingMobile bg-white shadow-lg flex flex-row justify-between px-4 py-2 items-center sm:px-8 sm:py-4">
      <Link href={"/"}>
        <a title="Home">
          <Logo />
        </a>
      </Link>
      <h1 className="sr-only">Habit tracker</h1>
      <div className="sm:hidden">
        <SmallDevicesNav menuItems={menu} />
      </div>
      <nav className="sm:flex flex-row gap-10 hidden items-center">
        <Link href="/">
          <a>Home</a>
        </Link>
        {user &&
          menu.map((item) => (
            <Link key={item.path} href={item.path}>
              <a>{item.label}</a>
            </Link>
          ))}
        {!user ? (
          <Link href="/signin">
            <a>Sign In/Up</a>
          </Link>
        ) : (
          <ProfileTop />
        )}
      </nav>
      {user && (
        <Link href={"/habits/add"}>
          <a className="active:bg-green-50 focus:outline-white w-12 h-12 flex items-center justify-center flex-grow-0 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50 rounded-full">
            <span className="w-10 h-10 text-green-600 block">
              <Plus />
            </span>
          </a>
        </Link>
      )}
    </header>
  );
};

export default HeadingMobile;
