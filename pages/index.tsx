import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="h-full overflow-hidden flex">
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
