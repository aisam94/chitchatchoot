import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import Loading from "../components/Loading";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Settings from "./settings";
import Navbar from "../components/Navbar";
import { NextRouter, useRouter } from "next/router";
import "react-notifications/lib/notifications.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { DocumentData, DocumentReference } from "@firebase/firestore";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  //get user status from firebase modules
  const [user, loading] = useAuthState(auth);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (user) {
      //references users db using users uid
      const docRef: DocumentReference<DocumentData> = doc(
        db,
        "users",
        user.uid
      );
      //create or overwrite data from user
      setDoc(
        docRef,
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar user={user} />
      <div className="screen-height">
        {user ? (
          <Component {...pageProps} />
        ) : router.pathname === "/register" ? (
          <Register />
        ) : router.pathname === "/about" ? (
          <About />
        ) : router.pathname === "/settings" ? (
          <Settings />
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};
export default MyApp;
