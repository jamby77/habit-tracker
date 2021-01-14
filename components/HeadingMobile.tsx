import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import Plus from "../svg/plus";
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
    <div className="HeadingMobile bg-white shadow-lg flex flex-row justify-between px-4 py-2 items-center sm:px-8 sm:py-4">
      <Link href={"/"}>
        <a title="Dashboard">
          <Logo />
        </a>
      </Link>
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
