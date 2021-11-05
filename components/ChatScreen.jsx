import React from "react";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useCollection } from "react-firebase9-hooks/firestore";
import { doc, collection, orderBy, query } from "firebase/firestore";
import Message from "./Message";
import TimeAgo from "timeago-react";

import { Avatar } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function ChatScreen() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // router.query.id may give error
  // const chatRef = doc(db, "chats", router.query.id);
  const chatRef = doc(db, "chats", "a");
  const messageRef = collection(chatRef, "messages");
  const messageQuery = query(messageRef, orderBy("timestamp", "asc"));
  const [messagesSnapshot] = useCollection(messageQuery);

  //map through message and create individual message box
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />;
      });
    }
  };

  return (
    <div className="w-full overflow-y-hidden">
      <div className="flex items-center">
        {/*avatar/profile pic*/}
        <Avatar className="m-2" />
        <div className="flex-1 m-2">
          {/*chat name/title/team*/}
          <p>example@gmail.com</p>
          {/*last seen info*/}
          <p>
            Last seen :
            <TimeAgo datetime={"2021-11-04 19:06:08"} />
          </p>
        </div>
        <div>
          {/*attach file*/}
          <AttachFileIcon />
          {/*settings/ three vertical dots*/}
          <MoreVertIcon />
        </div>
      </div>
      {/**/}
      {/**/}
      {/*text area*/}
      <div className="p-20 bg-gray-300 chat-min-height"></div>
      {/*bottom chat bar*/}
      <div className="flex items-center w-full">
        {/*insert emoji*/}
        <InsertEmoticonIcon className="m-2" />
        {/*insert text here to chat*/}
        <input
          className="flex-1 h-10 px-2 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
          type="text"
          name="message"
          placeholder="Type your message"
        />
        {/*mic*/}
        <MicIcon className="mx-1" />
        {/*camera*/}
        <PhotoCameraIcon className="mx-1" />
        {/*send text button*/}
        <input
          type="submit"
          value="Send"
          className="text-black rounded-lg py-2 bg-gray-200 hover:bg-gray-500 m-2 p-3"
        />
        {/**/}
        {/**/}
      </div>
    </div>
  );
}

export default ChatScreen;
