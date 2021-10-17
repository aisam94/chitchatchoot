import { auth, db } from "../firebase";
import { collection, query, where } from "@firebase/firestore";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useCollection } from "react-firebase9-hooks/firestore";
import ChatList from "./ChatList";
import { UserBar } from "./UserBar";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  //create snapshot of doc of chat that has user email
  //technically all document under chats willl have our email right???
  const chatCollection = collection(db, "chats");
  const queryChat = query(
    chatCollection,
    where("users", "array-contains", user?.email)
  );
  const [chatSnapshot] = useCollection(queryChat);

  return (
    <div className="w-1/4 h-full bg-red-300">
      <UserBar />

      {/*Chat List*/}
      {chatSnapshot?.docs.map(function (chat) {
        return (
          <ChatList key={chat.id} id={chat.id} users={chat.data().users} />
        );
      })}
      {/**/}
      {/**/}
      {/**/}
    </div>
  );
};

export default Sidebar;
