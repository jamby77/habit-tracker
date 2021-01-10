import React from "react";

const Warning = ({
  message,
  title = "Be Warned",
}: {
  message: string;
  title?: string;
}) => {
  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-600 text-yellow-800 p-4 flex-grow"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default Warning;
