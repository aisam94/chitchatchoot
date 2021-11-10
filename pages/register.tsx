import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Register: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Register user</title>
        <meta name="description" content="register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col items-center space-y-5 mt-4">
          <h1 className="font-bold text-xl">Register your account</h1>
          <form className="flex flex-col space-y-4">
            <div className="rounded-md shadow-md flex flex-col">
              {/*Name*/}
              <input
                type="name"
                placeholder="Name"
                name="name"
                value=""
                className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
                required
              />
              {/*Email*/}
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value=""
                className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
                required
              />
              {/*Password*/}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value=""
                className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
                required
              />
              {/*Password 2*/}
              <input
                type="password"
                placeholder="Reenter password"
                name="password2"
                value=""
                className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <input
              className="text-white rounded py-2 bg-gray-400 hover:bg-gray-500"
              type="submit"
              value="REGISTER"
            />
          </form>
          <Link href="/login">
            <a className="text-blue-400 hover:text-blue-600">
              Already have an account? Sign in here.
            </a>
          </Link>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Register;
