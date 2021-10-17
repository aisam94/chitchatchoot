import { useAuthState } from "react-firebase9-hooks/auth";
import { auth, db } from "../firebase";
import getRecipientEmail from "../lib/getRecipientEmail";
import { collection, query, where } from "@firebase/firestore";
import { useCollection } from "react-firebase9-hooks/firestore";
import { Avatar } from "@mui/material";

type Props = {
  id?: string;
  users?: any;
};

const ChatList = ({ id, users }: Props) => {
  const [user] = useAuthState(auth);

  const userCollection = collection(db, "users");
  const queryUser = query(
    userCollection,
    where("email", "==", getRecipientEmail(users, user))
  );
  const [recipientSnapshot] = useCollection(queryUser);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users, user);
  console.log(recipientEmail[0]);
  return (
    <div className="flex items-center cursor-pointer break-words my-2 hover:bg-blue-50">
      {/*Recipient circle logo*/}
      {recipient ? (
        <Avatar
          alt=""
          className="h-8 w-8 mx-2 rounded-full ring-2 ring-white"
          src={recipient?.photoURL}
        />
      ) : (
        <Avatar className="h-8 w-8 mx-2 rounded-full ring-2 ring-white">
          {recipientEmail[0]}
        </Avatar>
      )}
      {/*Recipient email/ name*/}
      {/*is putting recipient or just id is enough?*/}
      <p>{recipientEmail}</p>
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
