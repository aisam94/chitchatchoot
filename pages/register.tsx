import { useState, FormEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter, NextRouter } from "next/router";

const Register: NextPage = () => {
  const router: NextRouter = useRouter();

  const createUser = (email: string, password: string): void => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // passwords not matching
      console.log("password not matching");
    } else {
      createUser(email, password);
      router.push("/");
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

  return (
    <div>
      <Head>
        <title>Register user</title>
        <meta name="description" content="register" />
        <link rel="icon" href="" />
      </Head>
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
            {/*Password*/}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
            {/*Password 2*/}
            <input
              type="password"
              placeholder="Reenter password"
              name="confirmPassword"
              value={confirmPassword}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
              onChange={(e) => change(e)}
              required
            />
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
