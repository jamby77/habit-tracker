import cn from "clsx";
import React from "react";
import { ReactFCWithClassName } from "./index";

const Container: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        "Container",
        "min-w-full min-h-full w-full h-full bg-red-50 flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
