import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [workingMinutes, setWorkingMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const values = {
    workingMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    showSettings,
    darkMode,
    setDarkMode,
    setWorkingMinutes,
    setShortBreakMinutes,
    setLongBreakMinutes,
    setShowSettings,
    toggleDarkMode,
  };
  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, useContext };
