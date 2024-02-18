import React, { useContext, useEffect, useState, useRef } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// -----icons------
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { PiSun, PiMoonLight } from "react-icons/pi";
// ----Component----
import Header from "./Header";
import { SettingsContext } from "./SettingsContext";
import ring from "./assets/bell-ring.mp3";

const Timer = ({ setShowSettings }) => {
  const settingInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); //work----shortBreak----longBreak
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [workModeCount, setWorkModeCount] = useState(1);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const workModeCountRef = useRef(workModeCount);

  function switchMode(nextMode) {
    let nextSeconds;

    if (nextMode === "work") {
      nextSeconds = settingInfo.workingMinutes * 60;
      workModeCountRef.current++;
    } else if (nextMode === "shortBreak") {
      nextSeconds = settingInfo.shortBreakMinutes * 60;
    } else if (nextMode === "longBreak") {
      nextSeconds = settingInfo.longBreakMinutes * 60;
      workModeCountRef.current = 0;
    } else {
      return;
    }

    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function initTimer() {
    secondsLeftRef.current = settingInfo.workingMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  function Sound() {
    const audio = new Audio(ring);
    return audio.play();
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        Sound();
        if (modeRef.current === "work" && workModeCountRef.current !== 4) {
          switchMode("shortBreak");
        } else if (
          modeRef.current === "work" &&
          workModeCountRef.current === 4
        ) {
          switchMode("longBreak");
        } else if (modeRef.current === "shortBreak") {
          switchMode("work");
        } else {
          switchMode("work");
        }
        return;
      }
      tick();
    }, 10);

    return () => clearInterval(interval);
  }, [settingInfo]);

  const totalSeconds =
    mode === "work"
      ? settingInfo.workingMinutes * 60
      : mode === "shortBreak"
      ? settingInfo.shortBreakMinutes * 60
      : settingInfo.longBreakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className={`${settingInfo.darkMode && "dark"}`}>
      <div className="flex flex-col justify-center items-center relative">
        <Header
          mode={mode}
          switchMode={switchMode}
          setIsPaused={setIsPaused}
          isPausedRef={isPausedRef}
        />
        <div className="rounded-full p-6 dark:bg-[#232750] dark:shadow-[#353d98] dark:shadow-md">
          <div className="rounded-full font-semibold dark:bg-[#151932]">
            <CircularProgressbarWithChildren
              strokeWidth={2}
              trailColor="transparent"
              value={percentage}
              text={minutes + ":" + seconds}
              styles={buildStyles({
                pathColor: settingInfo.darkMode ? "#ffca72" : `black`,
                trailColor: settingInfo.darkMode ? "transparent" : "#d6d6d6",
                textColor: settingInfo.darkMode ? "white" : "black",
              })}
            >
              <div className="flex justify-center mt-20 font-thin text-black dark:text-white ">
                {isPaused ? (
                  <button
                    onClick={() => {
                      setIsPaused(false);
                      isPausedRef.current = false;
                    }}
                    className="cursor-pointer text-2xl tracking-[0.5rem]"
                  >
                    Play
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsPaused(true);
                      isPausedRef.current = true;
                    }}
                    className="cursor-pointer text-2xl tracking-[0.5rem]"
                  >
                    Pause
                  </button>
                )}
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 text-black space-x-4">
        <button>
          <HiOutlineAdjustmentsHorizontal
            onClick={() => setShowSettings(true)}
            className="cursor-pointer size-10 dark:text-[#ffca72]"
          />
        </button>
        <button
          onClick={settingInfo.toggleDarkMode}
          className="dark:text-[#ffca72]"
        >
          {settingInfo.darkMode ? (
            <PiSun className="cursor-pointer size-10" />
          ) : (
            <PiMoonLight className="cursor-pointer size-10" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Timer;
