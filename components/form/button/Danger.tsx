import cn from "clsx";
import React from "react";
import Base from "./Base";

const Danger = ({ className = "", ...props }) => {
  const dangerClasses = `bg-red-500 
border-red-500 
hover:bg-red-700 
focus:bg-red-700 
focus:ring-red-400 
text-white`;
  return <Base {...props} className={cn(dangerClasses, className)} />;
};

export default Danger;
