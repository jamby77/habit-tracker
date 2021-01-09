import React from "react";

const Warning = ({
  message,
  title = "Just so you know",
}: {
  message: string;
  title?: string;
}) => {
  return (
    <div
      className="bg-blue-100 border-l-4 border-blue-600 text-blue-900 p-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default Warning;
