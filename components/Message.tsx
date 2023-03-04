import React from "react";
import dayjs from "dayjs";

type Props = {
  user: string;
  message: string;
  timestamp: string;
  recipient: string;
};

const Message = ({
  user,
  message,
  timestamp,
  recipient,
}: Props): JSX.Element => {
  const timeformatted = dayjs(timestamp).format("h:mm A");// 12:59 AM format

  if (recipient !== user) {
    return (
      <div className="float-left w-1/2 p-3 m-3 break-words bg-white rounded-xl clear-left">
        <p>{message}</p>
        <p className="float-right text-gray-400">{timeformatted}</p>
      </div>
    );
  } else {
    return (
      <div className="float-right w-1/2 p-3 m-3 bg-blue-100 rounded-xl clear-right ">
        <p>{message}</p>
        <p className="float-right text-gray-400">{timeformatted}</p>
      </div>
    );
  }
};

export default Message;
