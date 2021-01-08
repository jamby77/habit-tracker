import React from "react";
import Logo from "./Logo";
import Plus from "../svg/plus";

const HeadingMobile: React.FC = () => {
  return (
    <div className="bg-white shadow-lg flex flex-row justify-between px-4 py-2 items-center">
      <Logo />
      <button className="active:bg-green-50 focus:outline-white w-12 h-12 flex items-center justify-center flex-grow-0 focus:ring-2 focus:ring-green-200 focus:ring-opacity-50 rounded-full">
        <span className="w-8 h-8 text-green-600">
          <Plus className="stroke-current fill-current" />
        </span>
      </button>
    </div>
  );
};

export default HeadingMobile;
