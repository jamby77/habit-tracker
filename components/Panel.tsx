import cn from "clsx";
import React from "react";
import { ReactFCWithClassName } from "~c/index";

const Panel: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        "Panel",
        "bg-white text-gray-500 shadow-xl container",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
