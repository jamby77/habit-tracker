import React from "react";
import { ReactFCWithClassName } from "./index";
import cn from "clsx";

const Heading1: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <h1
      {...rest}
      className={cn(className, "font-bold text-3xl text-gray-900 uppercase")}
    >
      {children}
    </h1>
  );
};

export default Heading1;
