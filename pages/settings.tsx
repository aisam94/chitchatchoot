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

const Settings: NextPage = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col items-center space-y-5 mt-4">
          <div>
            <h1 className="font-bold text-xl">Settings</h1>
          </div>
          <div className="space-y-2">
            {/*enable dark theme*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <MoonIcon className="h-6 w-6" />
              <label
                htmlFor="dark-toggle"
                className="select-none settings-text-width cursor-pointer"
              >
                Dark Theme
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="dark-toggle"
                  id="dark-toggle"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="dark-toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            {/*show online status*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <CheckCircleIcon className="h-6 w-6" />
              <label
                htmlFor="online-status-toggle"
                className="select-none settings-text-width cursor-pointer"
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
              <VolumeUpIcon className="h-6 w-6" />
              <label
                htmlFor="sound-bell-toggle"
                className="select-none settings-text-width cursor-pointer"
              >
                Enable sound bell notification
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="sound-bell-toggle"
                  id="sound-bell-toggle"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="sound-bell-toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            {/*change text font*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <DocumentTextIcon className="h-6 w-6" />
              <label className="select-none settings-text-width cursor-pointer">
                Change text font
              </label>
              <ChevronRightIcon className="h-6 w-6" />
            </div>
            {/*delete account*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <TrashIcon className="h-6 w-6" />
              <label className="select-none settings-text-width cursor-pointer">
                Delete account
              </label>
            </div>
            {/*log out*/}
            <div className="flex space-x-2 hover:bg-gray-200">
              <LogoutIcon className="h-6 w-6 transform rotate-180" />
              <label className="select-none settings-text-width cursor-pointer">
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
