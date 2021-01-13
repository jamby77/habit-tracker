import React from "react";
import { useLayout } from "../lib/layout";
import { Notification } from "./index";

const Messages = () => {
  const { removeMessage, messages } = useLayout();
  if (!messages || messages.length === 0) {
    return null;
  }
  return (
    <div className="Messages flex flex-col w-full">
      {messages.map((m, idx) => {
        return (
          <div
            key={idx}
            className="flex-grow cursor-pointer"
            role="button"
            title="Click to dismiss"
            onClick={() => {
              removeMessage(m);
            }}
          >
            <Notification message={m.message} type={m.type} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
