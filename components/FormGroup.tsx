import React, { ReactNode } from "react";
import cn from "clsx";
import { ReactFCWithClassName } from "./index";

const FromGroup = ({
  children,
  className,
  full = true,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  full?: boolean;
}) => {
  return (
    <div {...rest} className={cn("px-3 mb-5", { "w-full": full }, className)}>
      {children}
    </div>
  );
};

export default FromGroup;
