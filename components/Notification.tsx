import React from "react";
import { Error, Info, Success, Warning } from "./alerts";

export enum NotificationType {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
}
const Notification = ({
  message,
  title,
  type = NotificationType.Info,
}: {
  message: string;
  title?: string;
  type: NotificationType;
}) => {
  if (type === NotificationType.Success) {
    return <Success message={message} title={title} />;
  }
  if (type === NotificationType.Warning) {
    return <Warning message={message} title={title} />;
  }
  if (type === NotificationType.Error) {
    return <Error message={message} title={title} />;
  }
  return <Info message={message} title={title} />;
};

export default Notification;
