import ChatList from "./ChatList";
import { UserBar } from "./UserBar";
import { getChatsList } from "../lib/referencesUtils";

const Sidebar = () => {
  //create snapshot of doc of chat that has user email
  const chatSnapshot = getChatsList();

  return (
    <div className="w-full overflow-y-auto break-words bg-gray-100 sm:block">
      <UserBar />

      {/*Chat List*/}
      {chatSnapshot?.docs.map((chat) => {
        return (
          <ChatList key={chat.id} id={chat.id} users={chat.data().users} />
        );
      })}
    </div>
  );
};

export default Sidebar;
