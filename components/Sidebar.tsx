import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { UserCircleIcon, ChatAltIcon } from "@heroicons/react/solid";
import { auth } from "../firebase";

import * as EmailValidator from "email-validator";

const Sidebar = () => {
  const createChat = () => {
    const input = prompt("Enter email address for user to chat with");

    if (!input) return null;
    if (EmailValidator.validate(input)) {
      //add chats to db chats collection
    }
  };
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
