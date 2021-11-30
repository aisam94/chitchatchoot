import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="h-full overflow-hidden flex">
      <Head>
        <title>ChitChatChoot</title>
        <meta name="description" content="Chitty chitty bang bang" />
        <link rel="icon" href="" />
      </Head>

      <main className="h-full w-full flex">
        <div className="w-full sm:w-1/4 h-full flex">
          <Sidebar />
        </div>
        <div className="w-full hidden sm:flex sm:w-3/4 bg-gray-200 items-center justify-center text-xl font-bold">
          No chat is selected
        </div>
      </main>
    </div>
  );
};

export default Home;
