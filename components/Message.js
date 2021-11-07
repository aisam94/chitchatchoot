import React from "react";
import dayjs from "dayjs";

function Message({ user, message, timestamp, recipient }) {
  const timeformatted = dayjs(timestamp).format("h:mm A");

  if (recipient !== user) {
    return (
      <div className="bg-white m-3 p-3 w-1/2 rounded-xl float-left clear-left ">
        <p>{message}</p>
        <p className="text-gray-400 float-right">{timeformatted}</p>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-100 m-3 p-3 w-1/2 rounded-xl float-right clear-right ">
        <p>{message}</p>
        <p className="text-gray-400 float-right">{timeformatted}</p>
      </div>
    );
  }
}

export default Message;