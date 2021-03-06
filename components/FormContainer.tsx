import cn from "clsx";
import React from "react";
import { ReactFCWithClassName } from "./index";

const FromContainer: ReactFCWithClassName = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn("FromContainer w-full overflow-auto", className)}
    >
      {children}
    </div>
  );
};

export default FromContainer;
