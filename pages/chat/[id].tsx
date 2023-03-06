import React, { useEffect, useState } from "react";
import Head from "next/head";
import { auth } from "../../firebase";
import getRecipientEmail from "../../lib/getRecipientEmail";
import { DocumentData } from "firebase/firestore";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { GetChatDoc } from "../../lib/referencesUtils";
import { User } from "firebase/auth";

function Chat() {
  const [user, setUser] = useState<User | null>(null);
  const chatSnapshot = GetChatDoc();
  const chatData: DocumentData | undefined = chatSnapshot?.data();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

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
