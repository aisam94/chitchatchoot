import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  DocumentData,
  CollectionReference,
  Query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { GetChatsList } from "../lib/referencesUtils";
import { User } from "firebase/auth";
import {z} from "zod";

interface Props {
  user: User | null | undefined;
}

export const UserBar = ({ user }: Props): JSX.Element => {
  const chatCollection: CollectionReference<DocumentData> = collection(
    db,
    "chats"
  );

  const chatSnapshot = GetChatsList(user);

  const chatAlreadyExist = (recipientEmail: string): boolean | undefined => {
    if (chatSnapshot !== undefined) {
      for (let i = 0; i < chatSnapshot?.docs.length; i++) {
        const found = chatSnapshot?.docs[i]
          .data()
          .users.find((user: string) => user === recipientEmail);
        if (found) {
          return true;
        }
      }
      return false;
    }
    return undefined;
  };

  //find user photo url
  const userCollection: CollectionReference<DocumentData> = collection(
    db,
    "users"
  );
  const queryUser: Query<DocumentData> | undefined = user
    ? query(userCollection, where("email", "==", user?.email))
    : undefined;
  const [userSnapshot] = useCollection(queryUser);
  const userPhotoUrl: string = userSnapshot?.docs?.[0].data().photoURL;
  const userFirstLetter = user?.email !== null ? user?.email[0] : "";

  //create chat by entering recipient email via prompt
  const createChat = (): void => {
    const input = prompt("Enter email address for user to chat with");
    if (!input) {
      // return null;
      return;
    }
    if (
      // check if input is valid email, input not user and input already exist
      z.string().email().safeParse(input).success &&
      input !== user?.email &&
      !chatAlreadyExist(input)
    ) {
      //add chats to db chats collection
      setDoc(doc(chatCollection), { users: [user?.email, input] });
    }
  };

  return (
    <div className="flex items-center px-2">
      {/*User logo circle*/}
      {userPhotoUrl ? (
        <img
          src={userPhotoUrl}
          alt="photoImg"
          className="mx-1 my-2 mr-2 w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="relative mx-1 my-2 mr-2 w-10 h-10 bg-gray-400 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
          <span className="absolute text-3xl left-0 top-0 text-purple-800"></span>
          {userFirstLetter}
        </div>
      )}
      {/*User name/email*/}
      <p className="text-sm font-semibold break-words userbar-name-width">
        {user?.email}
      </p>
      {/* Clickable icons */}
      <div className="flex mx-2 space-x-1">
        {/*Add new chat/group*/}
        <img
          src="/icons/plus.svg"
          className="w-5 h-5 cursor-pointer hover:text-gray-500"
          onClick={createChat}
        />
        {/*3 vertical dots more settings*/}
        <img
          src="/icons/dots_vertical.svg"
          className="w-5 h-5 cursor-pointer hover:text-gray-500"
        />
        {/*Search in chat bar*/}
      </div>
    </div>
  );
};
