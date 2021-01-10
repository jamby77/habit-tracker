import React from "react";
import cn from "clsx";
import { ReactFCWithClassName } from "./index";

const FromContainer: ReactFCWithClassName = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={cn("w-full py-10 px-5 md:px-10", className)}>
      {children}
    </div>
  );
};

export default FromContainer;
