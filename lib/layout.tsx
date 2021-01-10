import React, { createContext, useContext, useEffect, useState } from "react";
import { NotificationType } from "../components/Notification";

const layoutContext = createContext<{
  title?: string;
  setTitle?: (title: string) => void;
  messages?: NotificationMessage[];
  info?: (msg: string) => void;
  success?: (msg: string) => void;
  warning?: (msg: string) => void;
  error?: (msg: string) => void;
  removeMessage?: (msg: NotificationMessage) => void;
}>({});

type NotificationMessage = {
  type: NotificationType;
  message: string;
};

export function useProvideLayout() {
  const initialTitle = "Habit Tracker";
  const [title, setTitle] = useState(initialTitle);
  const [messages, setMessages] = useState<NotificationMessage[]>([]);

  return {
    title,
    setTitle: (newTitle) => {
      setTitle(`${newTitle} | ${initialTitle}`);
    },
    messages,
    info: (info: string) => {
      setMessages([
        ...messages,
        {
          type: NotificationType.Info,
          message: info,
        },
      ]);
    },
    success: (success: string) => {
      setMessages([
        ...messages,
        {
          type: NotificationType.Success,
          message: success,
        },
      ]);
    },
    warning: (warning: string) => {
      setMessages([
        ...messages,
        {
          type: NotificationType.Warning,
          message: warning,
        },
      ]);
    },
    error: (error: string) => {
      setMessages([
        ...messages,
        {
          type: NotificationType.Error,
          message: error,
        },
      ]);
    },
    removeMessage: (msg: NotificationMessage) => {
      const msgUpdates = messages.filter((m) => m !== msg);
      setMessages(msgUpdates);
    },
  };
}

export const LayoutProvider: React.FC = ({ children }) => {
  const layout = useProvideLayout();
  return (
    <layoutContext.Provider value={layout}>{children}</layoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(layoutContext);
};

export const useTitle = (title) => {
  const { setTitle } = useLayout();
  useEffect(() => {
    setTitle(title);
  }, []);
};

export const elementParentPath = (el) => {
  const path = [];
  let currentElem = el;
  while (currentElem) {
    path.push(currentElem);
    currentElem = currentElem.parentElement;
  }
  if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
    path.push(document);
  if (path.indexOf(window) === -1) path.push(window);
  return path;
};
