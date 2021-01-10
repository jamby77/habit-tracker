import cn from "clsx";
import React from "react";
import { ReactFCWithClassName } from "./index";

const Heading1: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <h1
      {...rest}
      className={cn(
        "Heading1 font-bold text-3xl text-gray-900 uppercase",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading1;
