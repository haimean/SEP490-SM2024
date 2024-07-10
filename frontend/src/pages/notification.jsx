import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4200";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    // Gửi yêu cầu tham gia phòng với userId
    socket.emit("joinRoom", 1);

    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    return () => socket.disconnect();
  }, []);
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
