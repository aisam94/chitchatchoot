import { SyncLoader } from "react-spinners";

const Loading = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SyncLoader color="#9ca3af" loading={true} size={40} />
    </div>
  );
};

export default Loading;
