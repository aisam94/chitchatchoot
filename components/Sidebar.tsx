import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { UserCircleIcon, ChatAltIcon } from "@heroicons/react/solid";
import { auth, db } from "../firebase";
import {
  doc,
  addDoc,
  setDoc,
  collection,
  query,
  where,
} from "@firebase/firestore";

import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  //query for chat that has user email in chats db
  const chatCollection = collection(db, "chats");
  const queryChat = query(
    chatCollection,
    where("users", "array-contains", user.email)
  );
  // const [chatsSnapshot] = useCollection(queryChat);

  //create chat by entering recipient email via prompt
  const createChat = () => {
    const input = prompt("Enter email address for user to chat with");

    if (!input) return null;
    if (EmailValidator.validate(input) && input !== user.email) {
      //add chats to db chats collection
      // setDoc(doc(chatCollection), { users: [user.email, input] });
      setDoc(doc(chatCollection, input), { users: [user.email, input] }); // this one set recipient email as doc name
      // addDoc(chatCollection, { users: [user.email, input] });
    }
  };

  // const chatAlreadyExist = (recipientEmail: any) => {
  //   !!chatsSnapshot?.docs.find((chat: any) => {
  //     chat.data().users.find((user: any) => user === recipientEmail)?.length >
  //       0;
  //   });
  // };

  return (
    <div className="bg-red-300 w-1/4 h-full">
      {/*User logo circle*/}
      <UserCircleIcon onClick={() => auth.signOut()} className="w-12 h-12" />
      {/*Add new chat/group*/}
      <PlusIcon onClick={createChat} className="w-6 h-6" />
      {/*3 vertical dots more settings*/}
      <DotsVerticalIcon className="w-6 h-6" />
      {/*Search in chat bar*/}
      {/*Start a new chat*/}
      <ChatAltIcon className="w-6 h-6" />
      {/*Chat list component- user profile pic + name*/}
      {/**/}
      {/**/}
      {/**/}
    </div>
  );
};

export default Sidebar;
