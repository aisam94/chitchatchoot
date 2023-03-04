import { useState, FormEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter, NextRouter } from "next/router";
import NotificationContainer from "../components/NotificationContainer";

const Register: NextPage = () => {
  const [trigger, setTrigger] = useState(0);
  const [notificationColor, setNotificationColor] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPassword2Shown, setIsPassword2Shown] = useState(false);
  const router: NextRouter = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const togglePassword2Visibility = () => {
    setIsPassword2Shown(!isPassword2Shown);
  };

  const createUser = (email: string, password: string): void => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        createNotification(errorCode);
      });
  };

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    if (password === confirmPassword) {
      createUser(email, password);
    } else {
      // passwords not matching
      createNotification("Password not matching");
    }
  };

  interface formDataProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [formData, setFormData] = useState<formDataProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword }: formDataProps = formData;

  const change = (event: { target: HTMLInputElement }): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createNotification = (errorMsg: string): any => {
    setTrigger((trigger) => trigger + 1);
    setNotificationColor("error");
    switch (errorMsg) {
      case "auth/weak-password":
        setNotificationText("Password should be at least 6 characters");
        break;
      case "auth/invalid-email":
        setNotificationText("Invalid email format");
        break;
      case "auth/email-already-in-use":
        setNotificationText("Email already in use");
        break;
      case "password not matching":
        setNotificationText("Password not matching");
        break;
      default:
        setNotificationText("Error registering account");
    }
  };

  return (
    <div>
      <Head>
        <title>Register user</title>
        <meta name="description" content="register" />
        <link rel="icon" href="" />
      </Head>
      <NotificationContainer
        trigger={trigger}
        color={notificationColor}
        text={notificationText}
      />
      <main className="flex flex-col items-center pt-4 space-y-5">
        <h1 className="text-xl font-bold">Register your account</h1>
        <form className="flex flex-col space-y-4" onSubmit={(e) => submit(e)}>
          <div className="flex flex-col shadow-md rounded-md">
            {/*Username*/}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
            {/*Email*/}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
            {/* Password wrapper */}
            <div className="relative flex items-center">
              {/*Password*/}
              <input
                type={isPasswordShown ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
                onChange={(e) => change(e)}
                required
              />
              {/* Eye password toggle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 right-3"
                onClick={togglePasswordVisibility}
              >
                {isPasswordShown ? (
                  <img
                    src="/icons/eye_off.svg"
                    className="cursor-pointer w-5 h-5"
                  />
                ) : (
                  <img
                    src="/icons/eye_on.svg"
                    className="cursor-pointer w-5 h-5"
                  />
                )}
              </div>
            </div>
            {/*Password 2 wrapper*/}
            <div className="relative flex items-center">
              {/* Password 2 */}
              <input
                type={isPassword2Shown ? "text" : "password"}
                placeholder="Reenter password"
                name="confirmPassword"
                value={confirmPassword}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
                onChange={(e) => change(e)}
                required
              />
              {/* Eye password 2 toggle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 right-3"
                onClick={togglePassword2Visibility}
              >
                {isPassword2Shown ? (
                  <img
                    src="/icons/eye_off.svg"
                    className="cursor-pointer w-5 h-5"
                  />
                ) : (
                  <img
                    src="/icons/eye_on.svg"
                    className="cursor-pointer w-5 h-5"
                  />
                )}
              </div>
            </div>
          </div>
          <input
            className="py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
            type="submit"
            value="REGISTER"
          />
        </form>
        <Link href="/login">
          <a className="text-blue-400 hover:text-blue-600">
            Already have an account? Sign in here.
          </a>
        </Link>
      </main>
    </div>
  );
};

export default Register;
