import cn from "clsx";
import React from "react";
import Base from "./Base";

const Warning = ({ className = "", ...props }) => {
  const warningClasses = `bg-yellow-500 
border-yellow-500 
hover:bg-yellow-700 
focus:bg-yellow-700 
focus:ring-yellow-400 
text-white`;
  return <Base {...props} className={cn(warningClasses, className)} />;
};

export default Warning;
