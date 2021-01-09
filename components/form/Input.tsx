import React from "react";
import cn from "clsx";

const Input = (props) => {
  const className = props.className || "";
  return (
    <input
      {...props}
      className={cn(
        "w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500",
        className
      )}
    />
  );
};

export default Input;
