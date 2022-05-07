import type { NextPage } from "next";

import {
  MoonIcon,
  VolumeUpIcon,
  CheckCircleIcon,
  LogoutIcon,
  DocumentTextIcon,
  TrashIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

import { NextRouter, useRouter } from "next/router";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";

const user = auth.currentUser; //for account deletion

const Settings: NextPage = () => {
  const router: NextRouter = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    //this stop from registering normal click to trigger this, maybe error due to typescript
    event.stopPropagation();
    router.push("/");
    signOut(auth);
  };

  const deleteAccount = () => {
    if (user != null) {
      deleteUser(user)
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          // An error ocurred
          console.log(error);
        });
    }
  };

  return (
    <div>
      <main>
        <div className="flex flex-col items-center pt-4 space-y-5">
          <div>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          <div className="space-y-2">
            {/*enable dark theme*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <MoonIcon className="w-6 h-6" />
              <label
                htmlFor="dark-toggle"
                className="cursor-pointer select-none settings-text-width"
              >
                Dark Theme
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="dark-toggle"
                  id="dark-toggle"
                  className="absolute block w-6 h-6 bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer toggle-checkbox"
                />
                <label
                  htmlFor="dark-toggle"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
                ></label>
              </div>
            </div>
            {/*show online status*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <CheckCircleIcon className="w-6 h-6" />
              <label
                htmlFor="online-status-toggle"
                className="cursor-pointer select-none settings-text-width"
              >
                Show online status
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="online-status-toggle"
                  id="online-status-toggle"
                  className="absolute block w-6 h-6 bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer toggle-checkbox"
                />
                <label
                  htmlFor="online-status-toggle"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
                ></label>
              </div>
            </div>
            {/*enable sound notification*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <VolumeUpIcon className="w-6 h-6" />
              <label
                htmlFor="sound-bell-toggle"
                className="cursor-pointer select-none settings-text-width"
              >
                Enable sound bell notification
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="sound-bell-toggle"
                  id="sound-bell-toggle"
                  className="absolute block w-6 h-6 bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer toggle-checkbox"
                />
                <label
                  htmlFor="sound-bell-toggle"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
                ></label>
              </div>
            </div>
            {/*change text font*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <DocumentTextIcon className="w-6 h-6" />
              <label className="cursor-pointer select-none settings-text-width">
                Change text font
              </label>
              <ChevronRightIcon className="w-6 h-6" />
            </div>
            {/*delete account*/}
            <div
              onClick={deleteAccount}
              className="flex space-x-2 hover:bg-gray-200"
            >
              <TrashIcon className="w-6 h-6" />
              <label className="cursor-pointer select-none settings-text-width">
                Delete account
              </label>
            </div>
            {/*log out*/}
            <div
              className="flex space-x-2 hover:bg-gray-200"
              onClick={(event) => handleClick(event)}
            >
              <LogoutIcon className="w-6 h-6 transform rotate-180" />
              <label className="cursor-pointer select-none settings-text-width">
                Log out of account
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
