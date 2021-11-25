import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="h-full overflow-hidden">
      <Head>
        <title>ChitChatChoot</title>
        <meta name="description" content="Chitty chitty bang bang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full flex">
        <Sidebar />
      </main>
    </div>
  );
};

export default Home;
