import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import Loading from "../components/Loading";
import Login from "./login";
import Navbar from "../components/Navbar";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function MyApp({ Component, pageProps }: AppProps) {
  //get user status from firebase modules
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      //references users db using users uid
      const docRef = doc(db, "users", user.uid);
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
      <Navbar />
      {user ? <Component {...pageProps} /> : <Login />}
    </>
  );
}
export default MyApp;
