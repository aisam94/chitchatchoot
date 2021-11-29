import React from "react";
import Head from "next/head";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../lib/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  collection,
  orderBy,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";

import { useRouter } from "next/router";

import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  // const router = useRouter();
  // const { id } = router.query;

  ////start of attempt
  //const ref = doc(db, "chats", id);

  ////prep message on the server, fetch all chat messages
  //const messageCollection = collection(ref, "messages");
  //const q = query(messageCollection, orderBy("timestamp", "asc"));
  //const messagesRef = getDocs(q);

  ////populate the array with data from messages database and change timestamp with different format
  //const messages = messagesRef.docs
  //  .map((doc) => ({
  //    id: doc.id,
  //    ...doc.data(),
  //  }))
  //  .map((messages) => ({
  //    ...messages,
  //    timestamp: messages.timestamp.toDate().getTime(),
  //  }));

  ////prep the chats, fetch the chat document
  //const chatRef = getDoc(ref);
  //const chat = {
  //  id: chatRef.id,
  //  ...chatRef.data(),
  //};

  ////end of attempt

  return (
    <div className="h-full flex">
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

  //prep message on the server, fetch all chat messages
  const messageCollection = collection(ref, "messages");
  const q = query(messageCollection, orderBy("timestamp", "asc"));
  const messagesRef = await getDocs(q);

  //populate the array with data from messages database and change timestamp with different format
  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //prep the chats, fetch the chat document
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
