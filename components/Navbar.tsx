import React, { Fragment } from "react";
import {
  BellIcon,
  UserCircleIcon,
  SearchIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { ChatIcon } from "@heroicons/react/solid";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import { getAuth, signOut } from "firebase/auth";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const main_navigation = [
  { name: "Home", href: "#" },
  { name: "Groups", href: "#" },
  { name: "Message", href: "#" },
];

const profile_navigation = [
  { name: "Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Theme", href: "#" },
];

const Navbar = () => {
  const auth = getAuth();

  return (
    <Disclosure as="nav" className="bg-gray-200">
      {({ open }) => (
        <>
          <div className="">
            <div className="relative flex items-center justify-between">
              {/*Menu toggle open items*/}
              <Disclosure.Button className="inline-flex items-center justify-center ml-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-500 sm:hidden">
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
              {/*Website logo */}
              <ChatIcon className="w-9 h-9 m-3" />
              {/*Item text*/}
              <div className="space-x-5 hidden sm:flex">
                {main_navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="p-2 rounded-md hover:text-white hover:bg-gray-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="relative ml-auto mr-2 text-gray-600 hidden sm:block">
                {/*Search bar*/}
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search ..."
                />
                {/*Search icon*/}
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-3 mr-3"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>{" "}
              </div>
              <div className="flex my-2 mr-2 p-2 space-x-2">
                {/*Notification alert bell icon*/}
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {/*Menu popup*/}
                <Menu as="div">
                  <div>
                    <Menu.Button>
                      {/*Circle profile picture dropdown*/}
                      <UserCircleIcon className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {/*Profile circle items*/}
                    <Menu.Items className="origin-top-right absolute right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="flex flex-col m-2 ">
                        {profile_navigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item key="logout">
                          {({ active }) => (
                            <a
                              onClick={() => signOut(auth)}
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Log Out
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/*Disclosure panel popup*/}
          <Disclosure.Panel className="sm:hidden">
            {/*item text*/}
            <div className="flex flex-col mx-4 space-y-2">
              {main_navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 rounded-md hover:text-white hover:bg-gray-500"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="inline-block relative text-gray-600 ml-4 mt-2">
              {/*Search bar*/}
              <input
                className="border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none mb-3"
                type="search"
                name="search"
                placeholder="Search ..."
              />
              {/*Search icon*/}
              {/*need to fix search icon css styling*/}
              <button
                type="submit"
                className="relative right-7 top-1 mt-3 mr-3"
              >
                <SearchIcon className="w-4 h-4" />
              </button>{" "}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
