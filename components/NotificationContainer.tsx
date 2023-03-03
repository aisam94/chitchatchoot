import { Notification } from "./Notification";
import { useEffect, useState } from "react";

const NotificationContainer = ({ trigger, color, text }: any) => {
  const [notifications, setNotifications]: any = useState([]);

  const createNotification = (color: any, text: any) => {
    setNotifications([
      ...notifications,
      { color, id: notifications.length, text: text },
    ]);
  };

  useEffect(() => {
    if (trigger) {
      createNotification(color, text);
    }
  }, [trigger]);

  return (
    <div className="absolute top-1 right-1">
      {notifications.map(({ id, color, text }: any) => {
        return <Notification key={id} text={text} color={color} />;
      })}
    </div>
  );
};

export default NotificationContainer;
