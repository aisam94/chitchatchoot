import React from "react";
import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { auth, db } from "../firebase";
import { doc, setDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import { Avatar } from "@mui/material";

export const UserBar: React.FC<{}> = () => {
  const [user] = useAuthState(auth);
  const chatCollection = collection(db, "chats");

  const userChatQuery = user
    ? query(chatCollection, where("users", "array-contains", user?.email))
    : undefined;
  const [chatSnapshot] = useCollection(userChatQuery);

  const chatAlreadyExist = (recipientEmail: any) => {
    // !!chatSnapshot?.docs.find((chat) => {
    //   chat.data().users.find((user: any) => user === recipientEmail)?.length >
    //     0;
    // });
    //
    //this could be slow as it iterates whole list
    if (chatSnapshot !== undefined) {
      for (let i = 0; i < chatSnapshot?.docs.length; i++) {
        const found = chatSnapshot?.docs[i]
          .data()
          .users.find((user: any) => user === recipientEmail);
        if (found) {
          return true;
        }
      }
      return false;
    }
  };

  //find user photo url
  const userCollection = collection(db, "users");
  const queryUser = user
    ? query(userCollection, where("email", "==", user?.email))
    : undefined;
  const [userSnapshot] = useCollection(queryUser);
  const userPhotoUrl = userSnapshot?.docs?.[0].data().photoURL;
  const userFirstLetter = user?.email !== null ? user?.email[0] : "";

  //create chat by entering recipient email via prompt
  const createChat = () => {
    const input = prompt("Enter email address for user to chat with");
    if (!input) return null;
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
      <p className="text-sm break-words userbar-name-width font-semibold">
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
