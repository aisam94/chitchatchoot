import { Notification } from "./Notification";
import { useEffect, useState } from "react";

type NotificationContainerProps = {
  trigger: number;
  color: string;
  text: string;
};

type NotificationItem = {
  color: string;
  id: number;
  text: string;
};

const NotificationContainer = ({
  trigger,
  color,
  text,
}: NotificationContainerProps) => {
  const [notifications, setNotifications]  = useState<NotificationItem[]>([]);

  const createNotification = (color: string, text: string) => {
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
      {notifications.map(({ id, color, text }: NotificationItem) => {
        return <Notification key={id} text={text} color={color} />;
      })}
    </div>
  );
};

export default NotificationContainer;
