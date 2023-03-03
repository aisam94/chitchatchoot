import { useEffect, useState } from "react";
import styles from "./notification.module.css";

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

type NotificationType = {
  color?: string;
  text: string;
  timeToClose?: number;
};

const CrossIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="220px"
      height="220px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M19 5L4.99998 19M5.00001 5L19 19"
          stroke="#ffffff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const InfoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM10.25 11C10.25 10.4477 10.6977 10 11.25 10H12.75C13.3023 10 13.75 10.4477 13.75 11V18C13.75 18.5523 13.3023 19 12.75 19H11.25C10.6977 19 10.25 18.5523 10.25 18V11ZM14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9C13.1046 9 14 8.10457 14 7Z"
          fill="#ffffff"
        ></path>{" "}
      </g>
    </svg>
  );
};

const SuccessIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#ffffff"
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
        ></path>
      </g>
    </svg>
  );
};

const WarningIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#ffffff"
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
        ></path>
      </g>
    </svg>
  );
};

const ErrorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="#ffffff"
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      enable-background="new 0 0 512 512"
      xmlSpace="preserve"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M64,256c0-106.1,86-192,192-192 c42.1,0,81,13.7,112.6,36.7L100.7,368.6C77.7,337,64,298.1,64,256z M256,448c-42.1,0-81-13.7-112.6-36.7l267.9-267.9 c23,31.7,36.7,70.5,36.7,112.6C448,362.1,362,448,256,448z"></path>{" "}
      </g>
    </svg>
  );
};

function getIcon(color: any) {
  switch (color) {
    case "info":
      return <InfoIcon className="h-5 w-5" />;
      break;
    case "success":
      return <SuccessIcon className="h-5 w-5" />;
      break;
    case "warning":
      return <WarningIcon className="h-5 w-5" />;
      break;
    case "error":
      return <ErrorIcon className="h-5 w-5" />;
      break;
    default:
      return <div></div>;
      break;
  }
}

export const Notification = ({
  color = Color.info,
  text,
  timeToClose = 3_000,
}: NotificationType): JSX.Element => {
  const [isClosing, setIsClosing] = useState(false);

  function closeNotification() {
    setIsClosing(true);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsClosing(true), timeToClose);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isClosing && styles.shrink} `}>
      <div className={`${styles.notification} ${styles[color]}`}>
        <div className="mr-2">{getIcon(color)}</div>
        <div className="text-left flex-grow">{text}</div>
        <button className={styles.closeButton} onClick={closeNotification}>
          <CrossIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
