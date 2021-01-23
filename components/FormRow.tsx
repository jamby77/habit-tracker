import cn from "clsx";
import React from "react";
import { ReactFCWithClassName } from "./index";

const FromRow: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={cn("FromRow flex w-full", className)}>
      {children}
    </div>
  );
};

export default FromRow;
