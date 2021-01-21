import React from "react";

const PageHeader = ({ title = "" }) => {
  return (
    <header className="bg-red-700 py-10">
      <h2 className="text-3xl text-left pl-4 text-white font-bold">{title}</h2>
    </header>
  );
};

export default PageHeader;
