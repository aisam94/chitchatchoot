import React from "react";
import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  DocumentData,
  CollectionReference,
  Query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import { Avatar } from "@mui/material";
import { getChatsList } from "../lib/referencesUtils";
import { User } from "firebase/auth";

interface Props {
  user: User | null | undefined;
}

export const UserBar = ({ user }: Props): JSX.Element => {
  const chatCollection: CollectionReference<DocumentData> = collection(
    db,
    "chats"
  );

  const chatSnapshot = getChatsList(user);

  const chatAlreadyExist = (recipientEmail: string): boolean | undefined => {
    if (chatSnapshot !== undefined) {
      for (let i = 0; i < chatSnapshot?.docs.length; i++) {
        const found = chatSnapshot?.docs[i]
          .data()
          .users.find((user: string) => user === recipientEmail);
        if (found) {
          return true;
        }
      }
      return false;
    }
    return undefined;
  };

  //find user photo url
  const userCollection: CollectionReference<DocumentData> = collection(
    db,
    "users"
  );
  const queryUser: Query<DocumentData> | undefined = user
    ? query(userCollection, where("email", "==", user?.email))
    : undefined;
  const [userSnapshot] = useCollection(queryUser);
  const userPhotoUrl: string = userSnapshot?.docs?.[0].data().photoURL;
  const userFirstLetter = user?.email !== null ? user?.email[0] : "";

  //create chat by entering recipient email via prompt
  const createChat = (): void => {
    const input = prompt("Enter email address for user to chat with");
    if (!input) {
      // return null;
      return;
    }
    if (
      EmailValidator.validate(input) &&
      input !== user?.email &&
      !chatAlreadyExist(input)
    ) {
      //add chats to db chats collection
      setDoc(doc(chatCollection), { users: [user?.email, input] });
    }
  };

  return (
    <div className="flex items-center px-2">
      {/*User logo circle*/}
      {userPhotoUrl ? (
        <Avatar
          alt=""
          src={userPhotoUrl}
          className="mx-1 my-2 mr-2 rounded-full ring-1 ring-white"
        />
      ) : (
        <Avatar className="mx-1 my-2 mr-2 rounded-full ring-2 ring-white">
          {userFirstLetter}
        </Avatar>
      )}
      {/*User name/email*/}
      <p className="text-sm font-semibold break-words userbar-name-width">
        {user?.email}
      </p>
      {/* Clickable icons */}
      <div className="flex mx-2 space-x-1">
        {/*Add new chat/group*/}
        <PlusIcon
          onClick={createChat}
          className="w-5 h-5 cursor-pointer hover:text-gray-500"
        />
        {/*3 vertical dots more settings*/}
        <DotsVerticalIcon className="w-5 h-5 cursor-pointer hover:text-gray-500" />
        {/*Search in chat bar*/}
      </div>
    </div>
  );
};
