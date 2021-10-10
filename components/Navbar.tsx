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
import Link from "next/link";

import { getAuth, signOut } from "firebase/auth";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function MyLink(props: any) {
  let { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

const main_navigation = [
  { name: "Home", href: "/" },
  { name: "Groups", href: "#" },
  { name: "Message", href: "#" },
];

const profile_navigation = [
  { name: "Profile", href: "/profile" },
  {
    name: "Settings",
    href: "/settings",
  },
  {
    name: "Log out",
    href: "",
    onclick() {
      signOut(getAuth());
    },
  },
];

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-200">
      {({ open }) => (
        <>
          <div className="">
            <div className="relative flex items-center justify-between">
              {/*Menu toggle open items*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 ml-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-500 sm:hidden">
                {open ? (
                  <XIcon className="block w-6 h-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
              {/*Website logo */}
              <ChatIcon className="m-3 w-9 h-9" />
              {/*Item text*/}
              <div className="hidden space-x-5 sm:flex">
                {main_navigation.map((item) => (
                  <MyLink
                    key={item.name}
                    href={item.href}
                    className="p-2 rounded-md hover:text-white hover:bg-gray-500"
                  >
                    {item.name}
                  </MyLink>
                ))}
              </div>
              <div className="relative hidden ml-auto mr-2 text-gray-600 sm:block">
                {/*Search bar*/}
                <input
                  className="h-10 px-2 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search ..."
                />
                {/*Search icon*/}
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-3 mr-3"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>{" "}
              </div>
              <div className="flex p-2 my-2 mr-2 space-x-2">
                {/*Notification alert bell icon*/}
                <BellIcon className="w-6 h-6" aria-hidden="true" />
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
                    <Menu.Items className="absolute w-48 py-1 mt-2 bg-white shadow-lg origin-top-right right-2 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="flex flex-col m-2 ">
                        {profile_navigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <MyLink
                                href={item.href}
                                onClick={item.onclick}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </MyLink>
                            )}
                          </Menu.Item>
                        ))}
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
            <div className="relative inline-block mt-2 ml-4 text-gray-600">
              {/*Search bar*/}
              <input
                className="h-10 px-2 mb-3 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
                type="search"
                name="search"
                placeholder="Search ..."
              />
              {/*Search icon*/}
              {/*need to fix search icon css styling*/}
              <button
                type="submit"
                className="relative mt-3 mr-3 right-7 top-1"
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
