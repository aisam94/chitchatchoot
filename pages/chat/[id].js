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

import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

function Chat() {
  const [user] = useAuthState(auth);

  const chat = {
    id: "ppF986hxDb7FJO26nXfl",
    users: ["pulldtrigger94@gmail.com", "mario@gmail.com"],
  };

  const messages = [
    {
      id: "nlluHgsHTvx6a7bz0qB9",
      photoURL:
        "https://lh3.googleusercontent.com/a/AATXAJwI3SqQQoLotKbDWITo3zMMAHaa5LtzOikTkK7F=s96-c",
      user: "pulldtrigger94@gmail.com",
      timestamp: 1636209961081,
      message: "hello world",
    },
    {
      id: "Y1wFFj9hKfzrSjKJ8i4o",
      user: "pulldtrigger94@gmail.com",
      message: "hiya",
      photoURL:
        "https://lh3.googleusercontent.com/a/AATXAJwI3SqQQoLotKbDWITo3zMMAHaa5LtzOikTkK7F=s96-c",
      timestamp: 1636209966759,
    },
    {
      id: "hsK73UCeBGFPfaQWIjtY",
      timestamp: 1636285696220,
      photoURL:
        "https://lh3.googleusercontent.com/a/AATXAJwI3SqQQoLotKbDWITo3zMMAHaa5LtzOikTkK7F=s96-c",
      message: "its a you mario",
      user: "pulldtrigger94@gmail.com",
    },
    {
      id: "ZAgHMIZWu8SioZPouKHd",
      user: "pulldtrigger94@gmail.com",
      timestamp: 1636822508330,
      message: "kjkjjfa",
      photoURL:
        "https://lh3.googleusercontent.com/a/AATXAJwI3SqQQoLotKbDWITo3zMMAHaa5LtzOikTkK7F=s96-c",
    },
  ];

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

//export async function getServerSideProps(context) {
//  const ref = doc(db, "chats", context.query.id);

//  //prep message on the server, fetch all chat messages
//  const messageCollection = collection(ref, "messages");
//  const q = query(messageCollection, orderBy("timestamp", "asc"));
//  const messagesRef = await getDocs(q);

//  //populate the array with data from messages database and change timestamp with different format
//  const messages = messagesRef.docs
//    .map((doc) => ({
//      id: doc.id,
//      ...doc.data(),
//    }))
//    .map((messages) => ({
//      ...messages,
//      timestamp: messages.timestamp.toDate().getTime(),
//    }));

//  //prep the chats, fetch the chat document
//  const chatRef = await getDoc(ref);
//  const chat = {
//    id: chatRef.id,
//    ...chatRef.data(),
//  };

//  console.log({ messages });

//  return {
//    props: {
//      messages: JSON.stringify(messages),
//      chat: chat,
//    },
//  };
//}
