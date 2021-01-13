import cn from "clsx";
import React from "react";
import Base from "./Base";

const Primary = ({ className = "", ...props }) => {
  const primaryClasses = `bg-indigo-500 
border-indigo-500 
hover:bg-indigo-700 
focus:bg-indigo-700 
focus:ring-indigo-400 
text-white`;
  return <Base {...props} className={cn(primaryClasses, className)} />;
};

export default Primary;
