import styles from "./loading.module.css";

const Loading = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
