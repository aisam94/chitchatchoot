import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="h-full overflow-hidden">
      <Head>
        <title>ChitChatChoot</title>
        <meta name="description" content="Chitty chitty bang bang" />
        <link rel="icon" href="" />
      </Head>

      <main className="h-full flex">
        <Sidebar />
        <div className="flex w-full sm:w-3/4 bg-gray-200 items-center justify-center text-xl font-bold">
          No chat is selected
        </div>
      </main>
    </div>
  );
};

export default Home;
