import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import Loading from "../components/Loading";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Settings from "./settings";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function MyApp({ Component, pageProps }: AppProps) {
  //get user status from firebase modules
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

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
        {/* {user ? <Component {...pageProps} /> : { showRegisterOrLogin }} */}
      </div>
    </>
  );
}
export default MyApp;
