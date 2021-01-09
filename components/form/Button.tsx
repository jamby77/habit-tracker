import React from "react";
import cn from "clsx";

const Button = (props) => {
  const className = props.className || "";
  return (
    <button
      {...props}
      className={cn(
        "block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 uppercase text-white rounded-lg px-3 py-3 font-semibold",
        className
      )}
    />
  );
};

export default Button;
