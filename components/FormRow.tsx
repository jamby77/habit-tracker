import React from "react";
import cn from "clsx";
import { ReactFCWithClassName } from "./index";

const FromRow: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={cn("flex -mx-3", className)}>
      {children}
    </div>
  );
};

export default FromRow;
