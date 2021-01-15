import { useEffect, useRef } from "react";
import { Notification } from "~c/index";
import { useLayout } from "~l/layout";
import { NotificationType } from "./Notification";

const Messages = () => {
  const { removeMessage, messages } = useLayout();
  const tempMessagesRef = useRef([]);
  useEffect(() => {
    const id = setTimeout(() => {
      tempMessagesRef.current.forEach((m) => removeMessage(m));
      tempMessagesRef.current = [];
    }, 15000);
    return () => clearTimeout(id);
  });

  if (!messages || messages.length === 0) {
    return null;
  }
  return (
    <div className="Messages flex flex-col w-full">
      {messages.map((m, idx) => {
        if (
          m.type === NotificationType.Info ||
          m.type === NotificationType.Success ||
          m.type === NotificationType.Warning
        ) {
          tempMessagesRef.current.push(m);
        }
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
