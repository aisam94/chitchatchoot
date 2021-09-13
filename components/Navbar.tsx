import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BellIcon, UserCircleIcon } from "@heroicons/react/outline";
const Navbar = () => {
  return (
    <nav className="bg-gray-200">
      <div className="flex">
        {/*website logo and text*/}
        <div className="m-2">Logo</div>
        <div className="flex m-2 space-x-10">
          <div>Dashboard</div>
          <div>Team</div>
          <div>Projects</div>
          <div>Message</div>
        </div>
        <div className="pt-2 relative mx-auto text-gray-600">
          {/*search bar*/}
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              // style="enable-background:new 0 0 56.966 56.966;"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            ></svg>
          </button>{" "}
        </div>
        <div className="flex m-2">
          {/*notification alert*/}
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {/*circle profile picture dropdown*/}
          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/*message*/}
        {/*group*/}
      </div>
    </nav>
  );
};

export default Navbar;
