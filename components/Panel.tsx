import React from "react";
import cn from "clsx";
import { ReactFCWithClassName } from "./index";

const Panel: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        "Panel",
        "bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
