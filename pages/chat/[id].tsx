import React from "react";
import Head from "next/head";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../lib/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, DocumentData, DocumentReference } from "firebase/firestore";
import { useRouter, NextRouter } from "next/router";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

function Chat() {
  const [user] = useAuthState(auth);
  const router: NextRouter = useRouter();
  const routerId: string = router.query.id as string;

  const chatRef: DocumentReference<DocumentData> = doc(db, "chats", routerId);
  const [chatSnapshot] = useDocument(chatRef);
  const chatData: DocumentData | undefined = chatSnapshot?.data();

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
