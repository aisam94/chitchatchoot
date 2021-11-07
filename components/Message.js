import React from "react";
import dayjs from "dayjs";

function Message({ user, message, timestamp }) {
  const timeformatted = dayjs(timestamp).format("h:mm A");
  return (
    <div className="bg-white m-3 p-3 w-1/2 rounded-xl">
      {/* <p>{user}</p> */}
      <p>{message}</p>
      <p className="text-gray-400">{timeformatted}</p>
    </div>
  );
}

export default Message;
