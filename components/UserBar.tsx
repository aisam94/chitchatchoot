import React from "react";
import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { auth, db } from "../firebase";
import { doc, setDoc, collection, query, where } from "@firebase/firestore";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useCollection } from "react-firebase9-hooks/firestore";
import * as EmailValidator from "email-validator";
import { Avatar } from "@mui/material";

export const UserBar: React.FC<{}> = () => {
  const [user] = useAuthState(auth);
  const chatCollection = collection(db, "chats");

  //find user photo url
  const userCollection = collection(db, "users");
  const queryUser = query(userCollection, where("email", "==", user?.email));
  const [userSnapshot] = useCollection(queryUser);
  const userPhotoUrl = userSnapshot?.docs?.[0].data().photoURL;

  //create chat by entering recipient email via prompt
  const createChat = () => {
    const input = prompt("Enter email address for user to chat with");
    if (!input) return null;
    if (EmailValidator.validate(input) && input !== user?.email) {
      //add chats to db chats collection
      setDoc(doc(chatCollection), { users: [user?.email, input] });
      // setDoc(doc(chatCollection, input), { users: [user?.email, input] }); // this one set recipient email as doc name
    }
  };

  return (
    <div className="flex items-center mx-2">
      {/*User logo circle*/}
      {userPhotoUrl ? (
        <Avatar
          alt=""
          src={userPhotoUrl}
          className="mx-1 my-2 mr-2 rounded-full ring-1 ring-white"
        />
      ) : (
        <Avatar className="mx-1 my-2 mr-2 rounded-full ring-2 ring-white">
          {user?.email[0]}
        </Avatar>
      )}
      {/*User name/email*/}
      <p className="break-words text-sm">{user?.email}</p>
      {/*Add new chat/group*/}
      <PlusIcon
        onClick={createChat}
        className="w-5 h-5 ml-4 hover:text-gray-500 cursor-pointer"
      />
      {/*3 vertical dots more settings*/}
      <DotsVerticalIcon className="w-5 h-5 ml-1 hover:text-gray-500 cursor-pointer" />
      {/*Search in chat bar*/}
    </div>
  );
};
