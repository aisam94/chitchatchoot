import React, { useState, useRef, MouseEvent, KeyboardEvent } from "react";
import { db } from "../firebase";
import { useRouter, NextRouter } from "next/router";
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
import { GetMessagesSnapshot, GetRecipientData } from "../lib/referencesUtils";
import { User } from "firebase/auth";

interface Props {
  chat: DocumentData | undefined;
  user: User | null | undefined;
}

const ChatScreen = ({ chat, user }: Props): JSX.Element => {
  const endOfMessageRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const router: NextRouter = useRouter();
  const routerId: string = router.query.id as string;
  const messagesSnapshot = GetMessagesSnapshot(routerId);

  //fetching recipient infos
  const recipientEmail: string = getRecipientEmail(chat?.users, user);
  const recipientData: DocumentData | undefined = GetRecipientData(
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
          <img
            src={recipientData?.photoURL}
            alt="photoImg"
            className="mx-2 w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="relative mx-2 w-10 h-10 bg-gray-400 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
            <span className="absolute text-3xl left-0 top-0 text-purple-800"></span>
            {recipientEmail[0]}
          </div>
        )}
        <div className="flex-1 m-2">
          {/* Username */}
          <p className="font-semibold">{recipientEmail}</p>
          {showLastSeen()}
        </div>
        {/* Icons */}
        <div className="mx-1 flex">
          {/*Attach file*/}
          <img src="/icons/attachfile.svg" className="cursor-pointer w-7 h-7" />
          {/*Settings/ three vertical dots*/}
          <img
            src="/icons/dots_vertical.svg"
            className="cursor-pointer w-7 h-7"
          />
        </div>
      </div>

      {/*MESSAGE TEXT CONTAINER*/}
      <div className="flex flex-col-reverse p-10 overflow-y-auto bg-gray-300 border-2 chat-container-height">
        {showMessages()}
      </div>

      {/*MESSAGE INPUT CONTAINER*/}
      <div className="flex items-center bg-white">
        {/*Insert emoji*/}
        <img
          src="/icons/add_emoticon.svg"
          className="m-2 cursor-pointer w-7 h-7"
        />
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
        <img src="/icons/mic_on.svg" className="m-x-1 cursor-pointer w-7 h-7" />
        {/*Camera*/}
        <img src="/icons/camera.svg" className="m-x-1 cursor-pointer w-7 h-7" />
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
