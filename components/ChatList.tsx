import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import getRecipientEmail from "../lib/getRecipientEmail";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Avatar } from "@mui/material";

type Props = {
  id?: string;
  users?: any;
};

const ChatList = ({ id, users }: Props) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const userCollection = collection(db, "users");
  const queryUser = query(
    userCollection,
    where("email", "==", getRecipientEmail(users, user))
  );
  const [recipientSnapshot] = useCollection(queryUser);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      className="flex items-center cursor-pointer break-words my-2 p-1 hover:bg-blue-200"
      onClick={enterChat}
    >
      {/*Recipient circle logo*/}
      {recipient && recipient?.photoURL !== null ? (
        <Avatar
          alt=""
          className="mx-2 ring-2 ring-white"
          src={recipient?.photoURL}
        />
      ) : (
        <Avatar className="mx-2 ring-1 ring-white">{recipientEmail[0]}</Avatar>
      )}
      {/*Recipient email/ name*/}
      <p className="break-words chatlist-recipient-width ">{recipientEmail}</p>
      {/*Last update date*/}
      {/*Text snippets*/}
      {/*Circle unread messages*/}
      {/**/}
      {/**/}
      {/**/}
      {/**/}
    </div>
  );
};

export default ChatList;
