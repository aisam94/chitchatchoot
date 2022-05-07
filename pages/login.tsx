import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";

const Login: NextPage = () => {
  const router: NextRouter = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const change = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event: any) => {
    event.preventDefault();
    signIn(email, password);
    router.push("/");
  };

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <Head>
        <title>Login user</title>
        <meta name="description" content="login" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex flex-col items-center pt-4 space-y-5">
        <h1 className="text-xl font-bold">Sign in to your account</h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={(event) => submit(event)}
        >
          {/*Input Form*/}
          <div className="flex flex-col shadow-md rounded-md">
            {/*Email*/}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              onChange={(event) => change(event)}
              required
            />
            {/*Password*/}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              onChange={(event) => change(event)}
              required
            />
          </div>
          <input
            type="submit"
            value="LOGIN"
            className="py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
          />
        </form>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember-me" className="block ml-2 text-gray-900">
              Remember me
            </label>
          </div>

          <Link href="">
            <a className="text-blue-400 hover:text-blue-600">
              Forgot your password?
            </a>
          </Link>
        </div>
        <Link href="/register">
          <a className="text-blue-400 hover:text-blue-600">
            Do not have an account? Register here.
          </a>
        </Link>
        {/*Sign in with Google*/}
        <div onClick={signInWithGoogle}>
          <Link href="/">
            <a className="text-blue-400 hover:text-blue-600">
              Sign in with Google
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
