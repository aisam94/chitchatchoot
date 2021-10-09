import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";

const Login: NextPage = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <div className="">
      <Head>
        <title>Login user</title>
        <meta name="description" content="login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="flex flex-col items-center space-y-5 mt-4">
          <h1 className="font-bold text-xl">Sign in to your account</h1>
          <form className="flex flex-col space-y-4">
            {/*Input Form*/}
            <div className="rounded-md shadow-md flex flex-col ">
              {/*Email*/}
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value=""
                className=" appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
                required
              />
              {/*Password*/}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value=""
                className=" appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <input
              type="submit"
              value="LOGIN"
              className="text-white rounded py-2 bg-gray-400 hover:bg-gray-500"
            />
          </form>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">
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
          <div onClick={signIn}>
            <Link href="/">
              <a className="text-blue-400 hover:text-blue-600">
                Sign in with Google
              </a>
            </Link>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Login;
