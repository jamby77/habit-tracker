import cn from "clsx";
import React from "react";
import Base from "./Base";

const Success = ({ className = "", ...props }) => {
  const successClasses = `bg-green-500 
border-green-500 
hover:bg-green-700 
focus:bg-green-700 
focus:ring-green-400 
text-white`;
  return <Base {...props} className={cn(successClasses, className)} />;
};

export default Success;
