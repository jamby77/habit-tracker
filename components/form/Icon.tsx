import React from "react";

const Icon = ({ icon }) => {
  return (
    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
      <i className={`mdi ${icon} text-gray-400 text-lg`} />
    </div>
  );
};

export default Icon;
