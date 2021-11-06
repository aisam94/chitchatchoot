import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useCollection } from "react-firebase9-hooks/firestore";
import {
  doc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import Message from "./Message";
import TimeAgo from "timeago-react";
import getRecipientEmail from "../lib/getRecipientEmail";

import { Avatar } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();

  const chatRef = doc(db, "chats", router.query.id);
  const messageRef = collection(chatRef, "messages");
  const messageQuery = query(messageRef, orderBy("timestamp", "asc"));
  const [messagesSnapshot] = useCollection(messageQuery);

  console.log(messages);

  // const recipientEmail = "example@gmail.com";
  const recipientEmail = getRecipientEmail(chat.users, user);

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

  const sendMessage = (e) => {
    e.preventDefault();
    setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    addDoc(collection(doc(db, "chats", router.query.id), "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  return (
    <div className="w-full overflow-y-hidden">
      {/*header bar*/}
      <div className="flex items-center">
        {/*avatar/profile pic*/}
        <Avatar className="m-2" />
        <div className="flex-1 m-2">
          {/*chat name/title/team*/}
          <p>{recipientEmail}</p>
          {/*last seen info*/}
          <p>
            Last seen :
            <TimeAgo datetime={"2021-11-04 19:06:08"} />
          </p>
        </div>
        <div className="mx-2 space-x-1">
          {/*attach file*/}
          <AttachFileIcon className="hover:text-gray-500 cursor-pointer" />
          {/*settings/ three vertical dots*/}
          <MoreVertIcon className="hover:text-gray-500 cursor-pointer" />
        </div>
      </div>
      {/**/}
      {/**/}

      {/*message text container*/}
      <div className="p-20 bg-gray-300 chat-min-height">
        <Message />
      </div>

      {/*message input container*/}
      <div className="flex items-center w-full">
        {/*insert emoji*/}
        <InsertEmoticonIcon className="m-2 hover:text-gray-500 cursor-pointer" />
        {/*insert text here to chat*/}
        <input
          className="flex-1 h-10 px-2 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
          type="text"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        {/*mic*/}
        <MicIcon className="mx-1 hover:text-gray-500 cursor-pointer" />
        {/*camera*/}
        <PhotoCameraIcon className="mx-1 hover:text-gray-500 cursor-pointer" />
        {/*send text button*/}
        <input
          type="submit"
          value="Send"
          disabled={!input}
          onClick={sendMessage}
          className="p-3 py-2 m-2 text-black bg-gray-200 rounded-lg hover:bg-gray-500"
        />
        {/**/}
        {/**/}
      </div>
    </div>
  );
}

export default ChatScreen;
