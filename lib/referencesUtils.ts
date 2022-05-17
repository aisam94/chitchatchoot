import { collection, query, where, doc, orderBy } from "firebase/firestore";
import {
  DocumentData,
  DocumentReference,
  CollectionReference,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useRouter, NextRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import getRecipientEmail from "./getRecipientEmail";

//get all chat with user in it
export const getChatsList = (user: User | null | undefined): QuerySnapshot<DocumentData> | undefined => {
  const chatCollection: CollectionReference<DocumentData> = collection(
    db,
    "chats"
  );
  const queryChat: Query<DocumentData> | undefined = user
    ? query(chatCollection, where("users", "array-contains", user?.email))
    : undefined;
  const [chatList] = useCollection(queryChat);

  return chatList;
};

//get a single chat document snapshot
export const getChatDoc = () => {
  const router: NextRouter = useRouter();
  const routerId: string = router.query.id as string;
  const chatRef: DocumentReference<DocumentData> = doc(db, "chats", routerId);
  const [chatSnapshot] = useDocument(chatRef);
  return chatSnapshot;
};

export const getMessagesSnapshot = (
  routerId: string
): QuerySnapshot<DocumentData> | undefined => {
  const chatRef: DocumentReference<DocumentData> = doc(db, "chats", routerId);
  const messageRef: CollectionReference<DocumentData> = collection(
    chatRef,
    "messages"
  );
  const messageQuery: Query<DocumentData> = query(
    messageRef,
    orderBy("timestamp", "asc")
  );
  const [messagesSnapshot] = useCollection(messageQuery);

  return messagesSnapshot;
};

export const getRecipientData = (
  users: string[],
  user: User | null | undefined
): DocumentData | undefined => {
  if (!users) {
    return undefined;
  }
  const userRef: CollectionReference<DocumentData> = collection(db, "users");
  // const recipientEmail: string = getRecipientEmail(chat?.users, user);
  const recipientEmail: string = getRecipientEmail(users, user);
  //query document where document have recipient email,
  //but isnt there only one, is there a need for query for multiple here?
  const recipientQuery: Query<DocumentData> = query(
    userRef,
    where("email", "==", recipientEmail)
  );
  const [recipientSnapshot] = useCollection(recipientQuery);
  const recipientData = recipientSnapshot?.docs?.[0]?.data();

  //some users that is listed may not be exist so it return as undefined
  return recipientData;
};
