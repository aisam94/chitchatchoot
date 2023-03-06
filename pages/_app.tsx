import { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import Loading from "../components/Loading";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Settings from "./settings";
import Navbar from "../components/Navbar";
import { NextRouter, useRouter } from "next/router";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { DocumentData, DocumentReference } from "@firebase/firestore";
import { User } from "firebase/auth";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router: NextRouter = useRouter();

  useEffect(() => {
    // maybe can just stright use auth.currentUser ??
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
      <Head>
        <title>ChitChatChoot</title>
        <meta name="description" content="Chitty chitty bang bang" />
        <link rel="icon" href="" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
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
