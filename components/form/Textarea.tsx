import React from "react";
import cn from "clsx";

const Textarea = (props) => {
  const className = props.className || "";
  return (
    <textarea
      {...props}
      className={cn(
        "w-full h-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500",
        className
      )}
    />
  );
};

export default Textarea;
