import React from "react";
import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <h1 className="mt-10 font-bold text-center">About the website</h1>
      <p className="w-full p-10 mx-auto mt-2 text-center text-gray-500 sm:w-1/2">
        This is a website that showcase a 1 on 1 chat function. Users can
        register using a new account or use existing Gmail account to
        communicate with others. Some function are being added from time to time
        as development goes. This website has been build to be as responsive as
        possible to accomodate different medium. Thank you for using this
        website.
      </p>
    </>
  );
};

export default About;
