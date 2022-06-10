import React from "react";
import Head from "next/head";
import { auth } from "../../firebase";
import getRecipientEmail from "../../lib/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData } from "firebase/firestore";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { GetChatDoc } from "../../lib/referencesUtils";

function Chat() {
  const [user] = useAuthState(auth);
  const chatSnapshot = GetChatDoc();
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
      {chatSnapshot && <ChatScreen chat={chatData} user={user} />}
    </div>
  );
}

export default Chat;
