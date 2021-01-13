import cn from "clsx";
import React from "react";
import Base from "./Base";

const Secondary = ({ className = "", ...props }) => {
  const secondaryClasses = `
bg-white
border-indigo-500 
hover:bg-indigo-200 
focus:bg-indigo-200 
focus:ring-indigo-400 
text-indigo-500`;

  return <Base {...props} className={cn(secondaryClasses, className)} />;
};

export default Secondary;
