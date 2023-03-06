import React, { MouseEvent } from "react";
import { useRouter, NextRouter } from "next/router";
import getRecipientEmail from "../lib/getRecipientEmail";
import { DocumentData } from "firebase/firestore";
import { GetRecipientData } from "../lib/referencesUtils";
import { User } from "firebase/auth";

type Props = {
  id: string;
  users: string[];
  user: User | null | undefined;
};

const ChatList = ({ id, users, user }: Props) => {
  const router: NextRouter = useRouter();
  const recipientData: DocumentData | undefined = GetRecipientData(users, user);
  const recipientEmail: string = getRecipientEmail(users, user);

  const enterChat = (event: MouseEvent): void => {
    event.preventDefault();
    router.push(`/chat/${id}`);
  };

  const isCurrentRecipient = () => {
    const routerId: string = router.query.id as string;
    if (id === routerId) return true;
    return false;
  };

  return (
    <div
      className={`flex items-center p-1 my-2 break-words cursor-pointer hover:bg-blue-200 ${
        isCurrentRecipient() && `bg-blue-400`
      }`}
      onClick={(event) => enterChat(event)}
    >
      {/*Recipient circle logo*/}
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
      {/*Recipient email/ name*/}
      <p className="break-words chatlist-recipient-width ">{recipientEmail}</p>
    </div>
  );
};

export default ChatList;
