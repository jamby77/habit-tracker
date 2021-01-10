import cn from "clsx";
import React from "react";

const Button = (props) => {
  const className = props.className || "";
  const buttonClasses = `
block 
w-full
max-w-full
mx-auto 
bg-indigo-500 
border-2
border-indigo-500 
disabled:opacity-50
disabled:cursor-not-allowed
hover:bg-indigo-700 
focus:bg-indigo-700 
focus:outline-white 
uppercase 
text-white 
rounded-lg
px-3 
py-3 
font-semibold`;
  return <button {...props} className={cn(buttonClasses, className)} />;
};

export default Button;
