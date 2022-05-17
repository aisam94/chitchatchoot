import React, { Fragment, MouseEvent } from "react";
import {
  UserCircleIcon,
  SearchIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { ChatIcon } from "@heroicons/react/solid";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  user: User | null | undefined
}

const Navbar = ({ user }: Props): JSX.Element => {
  const router: NextRouter = useRouter();

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  interface MyLinkProps {
    href: string;
    children: string;
    className: string;
    key?: string;
    onClick?: ((event: MouseEvent) => void) | undefined;
  }
  function MyLink(props: MyLinkProps): JSX.Element {
    let { href, children, ...rest } = props;

    return (
      <Link href={href} passHref>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  interface MainNavigationProps {
    name: string;
    href: string;
    className: string;
  }

  //groups and message is disabled for now
  const main_navigation: MainNavigationProps[] = user
    ? [
      {
        name: "Home",
        href: "/",
        className: "p-2 rounded-md hover:text-white hover:bg-gray-500",
      },
      {
        name: "Groups",
        href: "#",
        className: "p-2 rounded-md text-gray-500",
      },
      {
        name: "Message",
        href: "#",
        className: "p-2 rounded-md text-gray-500",
      },
      {
        name: "About",
        href: "/about",
        className: "p-2 rounded-md hover:text-white hover:bg-gray-500",
      },
    ]
    : [
      {
        name: "Login",
        href: "/login",
        className: "p-2 rounded-md hover:text-white hover:bg-gray-500",
      },
      {
        name: "Register",
        href: "/register",
        className: "p-2 rounded-md hover:text-white hover:bg-gray-500",
      },
      {
        name: "About",
        href: "/about",
        className: "p-2 rounded-md hover:text-white hover:bg-gray-500",
      },
    ];

  const profile_navigation = user
    ? [
      { name: "Profile", href: "/" },
      {
        name: "Settings",
        href: "/settings",
      },
      {
        name: "Log out",
        href: "",
        onclick(event: MouseEvent) {
          //why does this work???
          event.preventDefault();
          router.push("/");
          signOut(auth);
        },
      },
    ]
    : [
      {
        name: "Settings",
        href: "/settings",
      },
    ];

  return (
    <Disclosure as="nav" className="bg-gray-300">
      {({ open }) => (
        <>
          <div>
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
              <Link href="/">
                <div>
                  <ChatIcon className="m-3 cursor-pointer w-9 h-9" />
                </div>
              </Link>
              {/*Item text*/}
              <div className="hidden space-x-5 sm:flex">
                {main_navigation.map((item) => (
                  <MyLink
                    key={item.name}
                    href={item.href}
                    className={item.className}
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
              <div className="flex mr-3 space-x-2">
                {/*Menu popup*/}
                <Menu as="div">
                  <div>
                    <Menu.Button>
                      {/*Circle profile picture dropdown*/}
                      <UserCircleIcon
                        className="p-1 w-9 h-9 hover:text-gray-500"
                        aria-hidden="true"
                      />
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
                <a key={item.name} href={item.href} className={item.className}>
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
