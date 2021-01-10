import React from "react";
import cn from "clsx";
import { ReactFCWithClassName } from "./index";

const Container: ReactFCWithClassName = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        "min-w-full min-h-full w-full h-full bg-red-100 flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
