import React from "react";
import Head from "next/head";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../lib/getRecipientEmail";
import { useAuthState } from "react-firebase9-hooks/auth";
import {
  doc,
  collection,
  orderBy,
  query,
  getDocs,
  getDoc,
} from "@firebase/firestore";

import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <div className="page-height flex">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      {/*sidebar*/}
      <Sidebar />
      {/*chat container*/}
      <ChatScreen chat={chat} messages={messages} />
      {/**/}
      {/**/}
      {/**/}
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(db, "chats", context.query.id);

  //prep message on the server
  const messageCollection = collection(ref, "message");
  const q = query(messageCollection, orderBy("timestamp", "asc"));
  const messagesRef = await getDocs(q);

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //prep the chats
  // const chatRef = await ref.get();
  const chatRef = await getDoc(ref);
  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}