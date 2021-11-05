import React from "react";

function Message({ user, message }) {
  return (
    <div>
      <p>{user}</p>
      <p>{message}</p>
    </div>
  );
}

export default Message;
