import React, { MouseEvent } from "react";
import { useRouter, NextRouter } from "next/router";
import getRecipientEmail from "../lib/getRecipientEmail";
import { DocumentData } from "firebase/firestore";
import { Avatar } from "@mui/material";
import { getRecipientData } from "../lib/referencesUtils";
import { User } from "firebase/auth";

type Props = {
  id: string;
  users: string[];
  user: User | null | undefined
};

const ChatList = ({ id, users, user }: Props) => {
  const router: NextRouter = useRouter();
  const recipientData: DocumentData | undefined = getRecipientData(users, user);

  const recipientEmail: string = getRecipientEmail(users, user);

  const enterChat = (event: MouseEvent): void => {
    event.preventDefault();
    router.push(`/chat/${id}`);
  };

  return (
    <div
      className="flex items-center p-1 my-2 break-words cursor-pointer hover:bg-blue-200"
      onClick={(event) => enterChat(event)}
    >
      {/*Recipient circle logo*/}
      {recipientData && recipientData?.photoURL !== null ? (
        <Avatar
          alt=""
          className="mx-2 ring-2 ring-white"
          src={recipientData?.photoURL}
        />
      ) : (
        <Avatar className="mx-2 ring-1 ring-white">{recipientEmail[0]}</Avatar>
      )}
      {/*Recipient email/ name*/}
      <p className="break-words chatlist-recipient-width ">{recipientEmail}</p>
    </div>
  );
};

export default ChatList;
