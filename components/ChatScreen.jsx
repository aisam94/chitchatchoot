import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
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
  const recipientEmail = getRecipientEmail(chat.users, user);

  //map through message and create individual message box
  //this is not used btw
  const showMessages = () => {
    if (messagesSnapshot) {
      return (
        <div>
          {messagesSnapshot.docs.map(function (chat) {
            <Message
              key={chat.id}
              user={chat.data().user}
              recipient={recipientEmail}
              message={chat.data().message}
              timestamp={chat.data().timestamp?.toDate().toString()}
            />;
          })}
        </div>
      );
      //
      // return (
      //   <div>
      //     {["a", "b"].map((a) => (
      //       <div>{a}</div>
      //     ))}
      //   </div>
      // );
    } else {
      return JSON.parse(messages).map((message) => {
        <Message
          key={message.id}
          user={message.user}
          message={message.message}
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

  const handleKeyPress = (e) => {
    // trigger when pressing enter
    // if (e.charCode === 13) {
    //   sendMessage(e);
    // }
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-y-hidden sm:w-3/4 ">
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
        {/* icons */}
        <div className="mx-2 space-x-1">
          {/*attach file*/}
          <AttachFileIcon className="cursor-pointer hover:text-gray-500" />
          {/*settings/ three vertical dots*/}
          <MoreVertIcon className="cursor-pointer hover:text-gray-500" />
        </div>
      </div>
      {/**/}
      {/**/}

      {/*message text container*/}
      <div className="p-10 overflow-y-auto bg-gray-300 chat-container-height ">
        {messagesSnapshot
          ? messagesSnapshot.docs.map(function (chat) {
              return (
                <Message
                  key={chat.id}
                  user={chat.data().user}
                  recipient={recipientEmail}
                  message={chat.data().message}
                  timestamp={chat.data().timestamp?.toDate().toString()}
                />
              );
            })
          : JSON.parse(messages).map((chat) => {
              return (
                <Message
                  key={chat.id}
                  user={chat.user}
                  recipient={recipientEmail}
                  message={chat.message}
                  timestamp={chat.timestamp}
                />
              );
            })}
        {/* {showMessages()} */}
      </div>

      {/*message input container*/}
      <div className="flex items-center bg-white ">
        {/*insert emoji*/}
        <InsertEmoticonIcon className="m-2 cursor-pointer hover:text-gray-500" />
        {/*insert text here to chat*/}
        <input
          className="flex-1 w-full h-10 px-2 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
          type="text"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          placeholder="Your message"
        />
        {/*mic*/}
        <MicIcon className="mx-1 cursor-pointer hover:text-gray-500" />
        {/*camera*/}
        <PhotoCameraIcon className="mx-1 cursor-pointer hover:text-gray-500" />
        {/*send text button*/}
        <input
          type="submit"
          value="Send"
          disabled={!input}
          onClick={(e) => sendMessage(e)}
          className="p-3 py-2 m-2 text-black bg-gray-200 rounded-lg hover:bg-gray-500"
        />
        {/**/}
        {/**/}
      </div>
    </div>
  );
}

export default ChatScreen;
