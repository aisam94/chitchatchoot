import React, { useState, useRef, MouseEvent, KeyboardEvent } from "react";
import { auth, db } from "../firebase";
import { useRouter, NextRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  collection,
  serverTimestamp,
  addDoc,
  setDoc,
  DocumentData,
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
import { getMessagesSnapshot, getRecipientData } from "../lib/referencesUtils";

interface Props {
  chat: DocumentData | undefined;
}

const ChatScreen = ({ chat }: Props): JSX.Element => {
  const [user] = useAuthState(auth);
  const endOfMessageRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const router: NextRouter = useRouter();
  const routerId: string = router.query.id as string;
  const messagesSnapshot = getMessagesSnapshot(routerId);

  //fetching recipient infos
  const recipientEmail: string = getRecipientEmail(chat?.users, user);
  const recipientData: DocumentData | undefined = getRecipientData(
    chat?.users,
    user
  );
  const recipientLastSeen = recipientData?.lastSeen.toDate();

  //Functions
  const showMessages = (): JSX.Element => {
    return (
      <div>
        {messagesSnapshot &&
          messagesSnapshot.docs.map((chat) => {
            return (
              <Message
                key={chat.id}
                user={chat.data().user}
                recipient={recipientEmail}
                message={chat.data().message}
                timestamp={chat.data().timestamp?.toDate().toString()}
              />
            );
          })}
        {/* End of message screen marker div */}
        <div className="mb-12 clear-both " ref={endOfMessageRef}></div>
      </div>
    );
  };

  const sendMessage = (): void => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    }

    addDoc(collection(doc(db, "chats", routerId), "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user?.email,
      photoURL: user?.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  //trigger when clicking button
  const handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    sendMessage();
  };

  //trigger when pressing enter
  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const showLastSeen = (): JSX.Element => {
    if (recipientLastSeen !== undefined) {
      return (
        <p>
          {/* last seen info */}
          Last active:
          <TimeAgo datetime={recipientLastSeen} />
          {/* <TimeAgo datetime={"2021-11-04 19:06:08"} /> */}
        </p>
      );
    } else {
      return <p> Not active yet </p>;
    }
  };

  const scrollToBottom = (): void => {
    if (endOfMessageRef.current !== null) {
      endOfMessageRef!.current!.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col w-full overflow-y-hidden sm:w-3/4 ">
      {/*HEADER BAR*/}
      <div className="flex items-center">
        {/*Profile pic*/}
        {recipientData && recipientData?.photoURL !== null ? (
          <Avatar
            alt=""
            className="mx-2 ring-2 ring-white"
            src={recipientData?.photoURL}
          />
        ) : (
          <Avatar className="mx-2 ring-1 ring-white">
            {recipientEmail[0]}
          </Avatar>
        )}
        <div className="flex-1 m-2">
          {/* Username */}
          <p className="font-semibold">{recipientEmail}</p>
          {showLastSeen()}
        </div>
        {/* Icons */}
        <div className="mx-2 space-x-1">
          {/*Attach file*/}
          <AttachFileIcon className="cursor-pointer hover:text-gray-500" />
          {/*Settings/ three vertical dots*/}
          <MoreVertIcon className="cursor-pointer hover:text-gray-500" />
        </div>
      </div>

      {/*MESSAGE TEXT CONTAINER*/}
      <div className="flex flex-col-reverse p-10 overflow-y-auto bg-gray-300 border-2 chat-container-height">
        {showMessages()}
      </div>

      {/*MESSAGE INPUT CONTAINER*/}
      <div className="flex items-center bg-white">
        {/*Insert emoji*/}
        <InsertEmoticonIcon className="m-2 cursor-pointer hover:text-gray-500" />
        {/*Insert text here to chat*/}
        <input
          className="flex-1 w-full h-10 px-2 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
          type="text"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          placeholder="Your message"
        />
        {/*Mic*/}
        <MicIcon className="mx-1 cursor-pointer hover:text-gray-500" />
        {/*Camera*/}
        <PhotoCameraIcon className="mx-1 cursor-pointer hover:text-gray-500" />
        {/*Send text button*/}
        <input
          type="submit"
          value="Send"
          disabled={!input}
          onClick={(e) => handleClick(e)}
          className="p-3 py-2 m-2 text-black bg-gray-200 rounded-lg hover:bg-gray-500"
        />
      </div>
    </div>
  );
};

export default ChatScreen;
