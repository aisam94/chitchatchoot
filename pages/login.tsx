import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login: NextPage = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <div>
      <Head>
        <title>Login user</title>
        <meta name="description" content="login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center space-y-5 pt-4">
        <h1 className="text-xl font-bold">Sign in to your account</h1>
        <form className="flex flex-col space-y-4">
          {/*Input Form*/}
          <div className="flex flex-col shadow-md rounded-md">
            {/*Email*/}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value=""
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              required
            />
            {/*Password*/}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value=""
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
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
      </main>
    </div>
  );
};

export default Login;
