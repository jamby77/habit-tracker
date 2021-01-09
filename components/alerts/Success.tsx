import React from "react";

const Warning = ({
  message,
  title = "This is great",
}: {
  message: string;
  title?: string;
}) => {
  return (
    <div
      className="bg-green-100 border-l-4 border-green-600 text-green-900 p-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default Warning;
