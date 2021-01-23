import cn from "clsx";
import React from "react";

const Button = (props) => {
  const className = props.className || "";
  const buttonClasses = `
block 
w-full
max-w-full
mx-auto 
border-2
disabled:opacity-50
disabled:cursor-not-allowed
uppercase 
rounded-full
text-sm
px-3 
py-3 
font-semibold
focus:ring-1
focus:outline-none`;
  return <button {...props} className={cn(buttonClasses, className)} />;
};

export default Button;
