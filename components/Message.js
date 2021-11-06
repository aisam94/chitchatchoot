import React from "react";
import Moment from "react-moment";
import moment from "moment";

function Message({ user, message, timestamp }) {
  // const ts = moment(timestamp).format("LT");
  return (
    <div className="bg-white m-3 p-3 w-1/2 rounded-xl">
      {/* <p>{user}</p> */}
      <p>{message}</p>
      <Moment className="text-gray-400" format="LT">
        {timestamp}
      </Moment>
      {/* <p>{ts}</p> */}
    </div>
  );
}

export default Message;
