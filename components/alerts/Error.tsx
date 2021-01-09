import React from "react";

const Warning = ({
  message,
  title = "Oops, something went wrong",
}: {
  message: string;
  title?: string;
}) => {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-600 text-red-900 p-4 flex-grow"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default Warning;
