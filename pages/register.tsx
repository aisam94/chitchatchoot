import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const router = useRouter();
  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const submit = (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // passwords not matching
      console.log("password not matching");
    } else {
      createUser(email, password);
      router.push("/");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const change = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Head>
        <title>Register user</title>
        <meta name="description" content="register" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex flex-col items-center space-y-5 pt-4">
        <h1 className="font-bold text-xl">Register your account</h1>
        <form className="flex flex-col space-y-4" onSubmit={(e) => submit(e)}>
          <div className="rounded-md shadow-md flex flex-col">
            {/*Username*/}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
            {/*Email*/}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
            {/*Password*/}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
            {/*Password 2*/}
            <input
              type="password"
              placeholder="Reenter password"
              name="confirmPassword"
              value={confirmPassword}
              className="appearance-none border border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
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
      </main>
    </div>
  );
};

export default Register;
