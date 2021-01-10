import cn from "clsx";
import React, { ReactNode } from "react";

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
    <div
      {...rest}
      className={cn("FromGroup px-3 mb-5", { "w-full": full }, className)}
    >
      {children}
    </div>
  );
};

export default FromGroup;
