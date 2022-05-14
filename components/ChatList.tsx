import React, { MouseEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, NextRouter } from "next/router";
import { auth, db } from "../firebase";
import getRecipientEmail from "../lib/getRecipientEmail";
import {
  collection,
  query,
  where,
  CollectionReference,
  DocumentData,
  Query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Avatar } from "@mui/material";

type Props = {
  id: string;
  users: string[];
};

const ChatList = ({ id, users }: Props) => {
  const router: NextRouter = useRouter();
  const [user] = useAuthState(auth);
  const userCollection: CollectionReference<DocumentData> = collection(
    db,
    "users"
  );
  const queryUser: Query<DocumentData> = query(
    userCollection,
    where("email", "==", getRecipientEmail(users, user))
  );
  const [recipientSnapshot] = useCollection(queryUser);
  const recipient: DocumentData | undefined =
    recipientSnapshot?.docs?.[0]?.data();

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
      {recipient && recipient?.photoURL !== null ? (
        <Avatar
          alt=""
          className="mx-2 ring-2 ring-white"
          src={recipient?.photoURL}
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
