import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <SyncLoader color="#9ca3af" loading={true} size={40} />
    </div>
  );
};

export default Loading;
