import { auth, db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import { UserBar } from "./UserBar";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  //create snapshot of doc of chat that has user email
  const chatCollection = collection(db, "chats");
  //this give error when logging out
  const queryChat = query(
    chatCollection,
    where("users", "array-contains", user?.email)
  );
  const [chatSnapshot] = useCollection(queryChat);

  return (
    <div className="bg-gray-100 sm:block break-words overflow-y-auto w-full">
      <UserBar />

      {/*Chat List*/}
      {chatSnapshot?.docs.map((chat) => {
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
