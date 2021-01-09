import React from "react";
import cn from "clsx";

const Label = (props) => {
  const className = props.className || "";
  const { children, ...rest } = props;
  return (
    <label {...rest} className={cn("text-xs font-semibold px-1", className)}>
      {children}
    </label>
  );
};

export default Label;
