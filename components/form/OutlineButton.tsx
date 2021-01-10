import React from "react";
import cn from "clsx";

const OutlineButton = (props) => {
  const className = props.className || "";
  const buttonClasses = `
block 
w-full
max-w-xs
mx-auto 
bg-white
border-2
border-indigo-500 
disabled:opacity-50
disabled:cursor-not-allowed
hover:bg-indigo-200 
focus:bg-indigo-200 
focus:outline-white 
uppercase 
text-indigo-500
rounded-lg
px-3 
py-3 
font-semibold`;
  return <button {...props} className={cn(buttonClasses, className)} />;
};

export default OutlineButton;
