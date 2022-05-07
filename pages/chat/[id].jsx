import React from "react";
import Head from "next/head";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../lib/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

// import {
//   collection,
//   orderBy,
//   query,
//   getDocs,
//   getDoc,
// } from "firebase/firestore";

function Chat() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const chatRef = doc(db, "chats", router.query.id);
  const [chatSnapshot] = useDocument(chatRef);
  const chatData = chatSnapshot?.data();

  return (
    <div className="flex h-full">
      <Head>
        {chatData && (
          <title>Chat with {getRecipientEmail(chatData.users, user)}</title>
        )}
      </Head>
      {/*sidebar*/}
      <div className="hidden h-full sm:flex sm:w-1/4">
        <Sidebar />
      </div>
      {/*chat container*/}
      {chatSnapshot && <ChatScreen chat={chatData} />}
    </div>
  );
}

export default Chat;

// Server side aspect for loading chat messages at each request
//// export async function getServerSideProps(context) {
//  const ref = doc(db, "chats", context.query.id);

//  //prep message on the server, fetch all chat messages
//  const messagecollection = collection(ref, "messages");
//  const q = query(messagecollection, orderby("timestamp", "asc"));
//  const messagesref = await getdocs(q);

//  //populate the array with data from messages database and change timestamp with different format
//  const messages = messagesref.docs
//    .map((doc) => ({
//      id: doc.id,
//      ...doc.data(),
//    }))
//    .map((messages) => ({
//      ...messages,
//      timestamp: messages.timestamp.todate().gettime(),
//    }));

//  //prep the chats, fetch the chat document
//  const chatref = await getdoc(ref);
//  const chat = {
//    id: chatref.id,
//    ...chatref.data(),
//  };

//  return {
//    props: {
//      messages: JSON.stringify(messages),
//      chat: chat,
//    },
//  };
//};
