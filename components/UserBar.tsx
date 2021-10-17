import React from "react";
import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { auth, db } from "../firebase";
import { doc, setDoc, collection, query, where } from "@firebase/firestore";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useCollection } from "react-firebase9-hooks/firestore";
import * as EmailValidator from "email-validator";

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
      // setDoc(doc(chatCollection), { users: [user.email, input] });
      setDoc(doc(chatCollection, input), { users: [user?.email, input] }); // this one set recipient email as doc name
    }
  };

  return (
    <div className="flex items-center mx-2">
      {/*User logo circle*/}
      {userPhotoUrl ? (
        <img
          alt=""
          src={userPhotoUrl}
          className="h-8 w-8 my-2 mr-2 rounded-full ring-2 ring-white"
        />
      ) : (
        <UserCircleIcon className="h-12 w-12 mx-2" />
      )}
      {/*User name/email*/}
      <p className="break-words text-sm">{user?.email}</p>
      {/*Add new chat/group*/}
      <PlusIcon
        onClick={createChat}
        className="w-6 h-6 cursor-pointer ml-auto"
      />
      {/*3 vertical dots more settings*/}
      <DotsVerticalIcon className="w-6 h-6 " />
      {/*Search in chat bar*/}
    </div>
  );
};
