import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import { UserCircleIcon, ChatAltIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <div className="bg-red-300 w-1/4 h-full">
      {/*User logo circle*/}
      <UserCircleIcon className="w-12 h-12" />
      {/*Add new chat/group*/}
      <PlusIcon className="w-6 h-6" />
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
