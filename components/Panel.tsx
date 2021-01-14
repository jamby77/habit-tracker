import cn from "clsx";
import React from "react";
import { ReactFCWithClassName } from "~c/index";

const Panel: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        "Panel",
        "bg-gray-100 text-gray-500 rounded-3xl shadow-xl container overflow-hidden overflow-x-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
