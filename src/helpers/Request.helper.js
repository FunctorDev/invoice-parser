import { prop, path } from "ramda";
import { notification } from "antd";

export const showErrorMessageFromServer = (error) => {
  const defaultMessage = "An unexpected error has occurred, please try again";
  const message = prop("message", error);
  const reduxMessage = path(["payload", "message"], error);

  notification.error({
    message: message || reduxMessage || defaultMessage,
  });

  return Promise.reject(error);
};
