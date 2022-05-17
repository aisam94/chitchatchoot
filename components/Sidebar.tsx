import ChatList from "./ChatList";
import { UserBar } from "./UserBar";
import { getChatsList } from "../lib/referencesUtils";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../firebase'

const Sidebar = () => {
  //create snapshot of doc of chat that has user email
  const [user] = useAuthState(auth);
  const chatSnapshot = getChatsList(user);

  return (
    <div className="w-full overflow-y-auto break-words bg-gray-100 sm:block">
      <UserBar user={user}/>

      {/*Chat List*/}
      {chatSnapshot?.docs.map((chat) => {
        return (
          <ChatList key={chat.id} id={chat.id} users={chat.data().users} user={user} />
        );
      })}
    </div>
  );
};

export default Sidebar;
