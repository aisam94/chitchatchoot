import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="flex h-full overflow-hidden">
      <Head>
        <title>ChitChatChoot</title>
        <meta name="description" content="Chitty chitty bang bang" />
        <link rel="icon" href="" />
      </Head>

      <main className="flex w-full h-full">
        <div className="flex w-full h-full sm:w-1/4">
          <Sidebar />
        </div>
        <div className="items-center justify-center hidden w-full text-xl font-bold bg-gray-200 sm:flex sm:w-3/4">
          No chat is selected
        </div>
      </main>
    </div>
  );
};

export default Home;
