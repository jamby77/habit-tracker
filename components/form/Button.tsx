import React from "react";
import cn from "clsx";

const Button = (props) => {
  const className = props.className || "";
  const buttonClasses = `
block 
w-full
max-w-xs
mx-auto 
bg-indigo-500 
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
