import ChatList from "./ChatList";
import { UserBar } from "./UserBar";
import { GetChatsList } from "../lib/referencesUtils";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const Sidebar = () => {
  //create snapshot of doc of chat that has user email
  const [user, setUser] = useState<User | null>(null);
  const chatSnapshot = GetChatsList(user);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return (
    <div className="w-full overflow-y-auto break-words bg-gray-100 sm:block">
      <UserBar user={user} />

      {/*Chat List*/}
      {chatSnapshot?.docs.map((chat) => {
        return (
          <ChatList
            key={chat.id}
            id={chat.id}
            users={chat.data().users}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
