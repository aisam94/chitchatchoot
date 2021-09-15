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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-200">
      {({ open }) => (
        <>
          <div className="">
            <div className="relative flex items-center justify-between">
              {/*Menu toggle open items*/}
              <Disclosure.Button className="inline-flex items-center justify-center ml-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 sm:hidden">
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
                <div>Dashboard</div>
                <div>Team</div>
                <div>Projects</div>
                <div>Message</div>
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
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
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
            <div className="flex flex-col ml-4 space-y-2">
              <div>Dashboard</div>
              <div>Team</div>
              <div>Projects</div>
              <div>Message</div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
