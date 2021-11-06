import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";

import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen";

const Home: NextPage = () => {
  return (
    <div className="page-height overflow-hidden">
      <Head>
        <title>ChitChatChoot</title>
        <meta name="description" content="Chitty chitty bang bang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full flex">
        <Sidebar />
      </main>

      {/*
      <footer>
      <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
      >
      Powered by{" "}
      <span>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
        </a>
        </footer>
      */}
    </div>
  );
};

export default Home;
