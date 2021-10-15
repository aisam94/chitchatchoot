import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { UserCircleIcon, ChatAltIcon } from "@heroicons/react/solid";
import { auth, db } from "../firebase";
import { doc, setDoc, collection, query, where } from "@firebase/firestore";
import "firebase/compat/firestore";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase9-hooks/firestore";
import ChatList from "./ChatList";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const chatCollection = collection(db, "chats");

  //query for chat that has user email
  //technically all document under chats willl have our email right???
  const queryChat = query(
    chatCollection,
    where("users", "array-contains", user.email)
  );

  //snapshot of chat document
  const [chatSnapshot] = useCollection(queryChat);

  //create chat by entering recipient email via prompt
  const createChat = () => {
    const input = prompt("Enter email address for user to chat with");
    if (!input) return null;
    if (EmailValidator.validate(input) && input !== user.email) {
      //add chats to db chats collection
      // setDoc(doc(chatCollection), { users: [user.email, input] });
      setDoc(doc(chatCollection, input), { users: [user.email, input] }); // this one set recipient email as doc name
    }
  };

  return (
    <div className="w-1/4 h-full bg-red-300">
      <div className="flex items-center mx-2">
        {/*User logo circle*/}
        <UserCircleIcon onClick={() => auth.signOut()} className="w-12 h-12 " />
        {/*Add new chat/group*/}
        <PlusIcon
          onClick={createChat}
          className="w-6 h-6 cursor-pointer ml-auto"
        />
        {/*3 vertical dots more settings*/}
        <DotsVerticalIcon className="w-6 h-6 " />
        {/*Start a new chat*/}
        <ChatAltIcon className="w-6 h-6 " />
        {/*Search in chat bar*/}
      </div>
      {/*Chat List*/}
      {chatSnapshot?.docs.map(function (chat) {
        return <ChatList key={chat.id} id={chat.id} />;
      })}
      {/**/}
      {/**/}
      {/**/}
    </div>
  );
};

export default Sidebar;
