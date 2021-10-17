import { UserCircleIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase9-hooks/auth";
import { auth } from "../firebase";
import getRecipientEmail from "../lib/getRecipientEmail";

type Props = {
  id?: string;
  users?: any;
};

const ChatList = ({ id, users }: Props) => {
  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div className="flex items-center cursor-pointer break-words my-2 hover:bg-blue-50">
      {/*Recipient circle logo*/}
      <UserCircleIcon className="h-8 w-8 mx-2" />
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
