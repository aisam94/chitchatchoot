import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  DocumentData,
  CollectionReference,
  Query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import { UserBar } from "./UserBar";

const Sidebar = () => {
  //create snapshot of doc of chat that has user email
  const [user] = useAuthState(auth);
  const chatCollection: CollectionReference<DocumentData> = collection(
    db,
    "chats"
  );
  const queryChat: Query<DocumentData> | undefined = user
    ? query(chatCollection, where("users", "array-contains", user?.email))
    : undefined;
  const [chatSnapshot] = useCollection(queryChat);

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
