import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import MenuArrow from "../svg/menuArrow";
import ProfileTop from "./ProfileTop";

const SmallDevicesNav = ({ menuItems }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { pathname } = router;
  const [currentItem, setCurrentItem] = useState("Welcome");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const match = menuItems.find((item) => {
      return item.path === pathname;
    });
    if (match) {
      setCurrentItem(match.label);
    }
  }, [pathname]);
  if (!user) {
    return (
      <div>
        <Link href="/signin">
          <a>Sign In/Up</a>
        </Link>
      </div>
    );
  }
  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="relative flex flex-row items-center z-10 block rounded-md bg-white p-2 focus:outline-none text-gray-600"
      >
        <span className="">{currentItem}</span>
        <MenuArrow className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute -right-20 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 text-center divide-gray-200 divide-solid divide-y-2">
          {menuItems.map((item) => {
            return (
              <Link key={item.path} href={item.path}>
                <a
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  {item.label}
                </a>
              </Link>
            );
          })}
          <div className="pt-4">
            <ProfileTop />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallDevicesNav;
