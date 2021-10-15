import { UserCircleIcon } from "@heroicons/react/solid";

type Props = {
  id?: string;
  users?: any;
};

const ChatList = ({ id }: Props) => {
  return (
    <div className="flex items-center cursor-pointer break-words my-2 hover:bg-blue-50">
      {/*Recipient circle logo*/}
      <UserCircleIcon className="h-8 w-8 mx-2" />
      {/*Recipient email/ name*/}
      {/*is putting recipient or just id is enough?*/}
      <p>{id}</p>
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
