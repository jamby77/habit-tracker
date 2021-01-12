import cn from "clsx";
import React from "react";

const Icon = ({ icon, className = "", color = "" }) => {
  const iconClass = cn(
    "pointer-events-none flex items-center justify-center",
    className
  );
  console.log(className, iconClass);
  return (
    <div className={iconClass}>
      <i className={`mdi ${icon} ${color}`} />
    </div>
  );
};

export default Icon;
