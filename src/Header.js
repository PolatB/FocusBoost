import React, { useContext } from "react";
import { SettingsContext } from "./SettingsContext";

const Header = ({ mode, switchMode, setIsPaused, isPausedRef }) => {
  function handleSelectedMode(mode) {
    switchMode(mode);
    setIsPaused(true);
    isPausedRef.current = true;
  }

  const settingInfo = useContext(SettingsContext);

  return (
    <div className={`${settingInfo.darkMode && "dark"}`}>
      <ul className="flex space-x-4 mb-4 items-center px-4 py-3 rounded-full dark:bg-[#1e2140] text-sm">
        <li
          className={`px-4 py-2 rounded-full cursor-pointer dark:text-slate-400 ${
            mode === "work"
              ? "bg-slate-200 dark:bg-[#ffca72] dark:text-white"
              : null
          }`}
          onClick={() => handleSelectedMode("work")}
        >
          Work
        </li>
        <li
          className={`px-4 py-2 rounded-full cursor-pointer dark:text-slate-400 ${
            mode === "shortBreak"
              ? "bg-slate-200 dark:bg-[#ffca72] dark:text-white"
              : null
          }`}
          onClick={() => handleSelectedMode("shortBreak")}
        >
          Short Break
        </li>
        <li
          className={`px-4 py-2 rounded-full cursor-pointer dark:text-slate-400 ${
            mode === "longBreak"
              ? "bg-slate-200 dark:bg-[#ffca72] dark:text-white"
              : null
          }`}
          onClick={() => handleSelectedMode("longBreak")}
        >
          Long Break
        </li>
      </ul>
    </div>
  );
};

export default Header;
