import React from "react";
import { SettingsContext, useContext } from "./SettingsContext";
import { IoMdClose } from "react-icons/io";

const Settings = () => {
  const {
    workingMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    showSettings,
    setWorkingMinutes,
    setShortBreakMinutes,
    setLongBreakMinutes,
    setShowSettings,
  } = useContext(SettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setWorkingMinutes(workingMinutes);
    setShortBreakMinutes(shortBreakMinutes);
    setLongBreakMinutes(longBreakMinutes);
    setShowSettings(false);
  };

  return (
    <>
      {showSettings && (
        <div
          className={`block absolute w-auto h-auto bg-white px-8 rounded-xl border border-gray-400`}
        >
          <div className="flex justify-between my-8 items-center">
            <h1 className="font-bold">Settings</h1>
            <span onClick={() => setShowSettings(false)}>
              <IoMdClose className="cursor-pointer size-5" />
            </span>
          </div>
          <hr className="w-100 h-0.5 mx-auto my-2 bg-gray-200 border-0 rounded" />
          <h5 className="text-left">TIME (MINUTES)</h5>
          <div className="mt-1">
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-6">
                <div className="text-left flex flex-col">
                  <label
                    htmlFor="workingMinutes"
                    className="text-[#666a83] text-sm"
                  >
                    work
                  </label>
                  <input
                    type="number"
                    id="workingMinutes"
                    name="workingMinutes"
                    value={workingMinutes}
                    placeholder={workingMinutes}
                    onChange={(e) => setWorkingMinutes(e.target.value)}
                    className="bg-gray-200  rounded-xl w-28 p-2"
                  />
                </div>
                <div className="text-left flex flex-col">
                  <label
                    htmlFor="shortBreakMinutes"
                    className="text-[#666a83] text-sm"
                  >
                    short break
                  </label>
                  <input
                    type="number"
                    id="shortBreakMinutes"
                    name="shortBreakMinutes"
                    value={shortBreakMinutes}
                    placeholder={shortBreakMinutes}
                    onChange={(e) => setShortBreakMinutes(e.target.value)}
                    className="bg-gray-200 rounded-xl w-28 p-2"
                  />
                </div>
                <div className="text-left flex flex-col ">
                  <label
                    htmlFor="longBreakMinutes"
                    className="text-[#666a83] text-sm"
                  >
                    long break
                  </label>
                  <input
                    type="number"
                    id="longBreakMinutes"
                    name="longBreakMinutes"
                    value={longBreakMinutes}
                    placeholder={longBreakMinutes}
                    onChange={(e) => setLongBreakMinutes(e.target.value)}
                    className="bg-gray-200 rounded-xl w-28 p-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#ffca72] text-white my-4 px-6 py-2 rounded-full cursor-pointer mt-8"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
