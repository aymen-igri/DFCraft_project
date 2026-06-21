import { useTimer } from "../../shared/hooks/useTimer";
import { CirclePlay, Square, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from '../../shared/i18n/translations';

export default function Timer() {
  const {
    time,
    setTime,
    isRunning,
    setIsRunning,
    reset,
    setReset,
    originalTime,
    setOriginalTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    longBreakTime,
    setLongBreakTime,
    setPhaseType,
  } = useTimer();

  const [min, setMin] = useState(Math.floor(time / 60));
  const [bMin, setBMin] = useState(Math.floor(breakTime / 60));
  const [lbMin, setLBMin] = useState(Math.floor(longBreakTime / 60));
  const [desable, setDesable] = useState(true);
  const [pause, setPause] = useState(false);

  const { t } = useTranslation('home');

  useEffect(() => {
    if (!isRunning) {
      setMin(Math.floor(originalTime / 60));
      setBMin(Math.floor(breakTime / 60));
      setLBMin(Math.floor(longBreakTime / 60));
    }
  }, [time, isRunning, originalTime, breakTime, longBreakTime]);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const percentage = originalTime > 0 ? (time / originalTime) * 67 : 0;
  const radius = 115;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  const selectPomodoroTime = () => {
    setDesable(false);
    // Always start from work phase at beginning
    if (time === originalTime) {
      setPhaseType("work");

      // Read work time from inputs
      const validMin = Math.max(0, Math.floor(min));
      const validWorkTime = validMin * 60;

      // Read break time from inputs
      const validBMin = Math.max(0, Math.floor(bMin));
      const validBreakTime = validBMin * 60;
      
      // Read long break time from inputs
      const validLBMin = Math.max(0, Math.floor(lbMin));
      const validLongBreakTime = validLBMin * 60;

      if (validWorkTime > 0 && validBreakTime > 0 && validLongBreakTime > 0) {
        setWorkTime(validWorkTime);
        setBreakTime(validBreakTime);
        setLongBreakTime(validLongBreakTime);
        setTime(validWorkTime);
        setOriginalTime(validWorkTime);
        setLongBreakTime(validLongBreakTime);
      } else{
        alert("Work, break, and long break time must be greater than 0 seconds.");
      }
    }
    // Start timer (whether fresh start or resume)
    setIsRunning(true);
  };

  const timerControllers = () => {
    return isRunning ? (
      <>
        <Pause
          className="text-lightElements dark:text-darkElements w-14 h-14"
          onClick={() => {
            setIsRunning(false);
            setPause(true);
          }}
        />
      </>
    ) : (
      <>
        <CirclePlay
          className="text-lightElements dark:text-darkElements w-14 h-14"
          onClick={() => selectPomodoroTime()}
        />
        {pause && (
          <Square
            className="text-lightElements dark:text-darkElements w-14 h-14"
            onClick={() => {
              setReset(true);
              setDesable(true);
              setPause(false);
            }}
          />
        )}
      </>
    );
  };
  // just for test 
  const BlockedItem = {
    sownd : true ,
    acces : true 
  }

  // for reseting the timer
  useEffect(() => {
    if (reset) {
      setTime(originalTime); // Reset to whatever user set
      setMin(Math.floor(originalTime / 60));
      setIsRunning(false);
      setReset(false);
    }
  }, [reset, originalTime, setTime, setIsRunning, setReset]);

  return (
    <div className="flex flex-col items-center justify-center bg-light dark:bg-dark">
      <div className="relative">
        <div className="w-80 h-32 rounded-full flex justify-center items-center mt-[108px]">
          {isRunning ? (
            <p
              className={`text-lightElements dark:text-darkElements text-5xl font-semibold flex justify-center p-1`}
            >
              {formatTime(time)}
            </p>
          ) : time === originalTime ? (
            <div className="flex flex-col items-center">
              <p className="text-lightElements dark:text-darkElements text-5xl font-semibold flex justify-center p-1 gap-1">
                <span className="relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 text-sm px-2 py-0.5 rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 bg-light dark:bg-dark text-darkPoints dark:text-lightPoints border border-dark dark:border-light whitespace-nowrap">
                    {t('work')}
                  </span>
                  <input
                    type="text"
                    value={String(min).padStart(2, '0')}
                    onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                    className="w-[52px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-light dark:bg-dark outline-none"
                  />
                </span>
                <span className="mt-1">:</span>
                <span className="relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 text-sm px-2 py-0.5 rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 bg-light dark:bg-dark text-darkPoints dark:text-lightPoints border border-dark dark:border-light whitespace-nowrap">
                    {t('break')}
                  </span>
                  <input
                    type="text"
                    value={String(bMin).padStart(2, '0')}
                    onChange={(e) => setBMin(parseInt(e.target.value) || 0)}
                    className="w-[52px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-light dark:bg-dark outline-none"
                  />
                </span>
                <span className="mt-1">:</span>
                <span className="relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 text-sm px-2 py-0.5 rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 bg-light dark:bg-dark text-darkPoints dark:text-lightPoints border border-dark dark:border-light whitespace-nowrap">
                    {t('longBreak')}
                  </span>
                  <input
                    type="text"
                    value={String(lbMin).padStart(2, '0')}
                    onChange={(e) => setLBMin(parseInt(e.target.value) || 0)}
                    className="w-[52px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-light dark:bg-dark outline-none"
                  />
                </span>
              </p>
            </div>
          ) : (
            <p
              className={`text-lightElements dark:text-darkElements text-5xl font-semibold flex justify-center p-1`}
            >
              {formatTime(time)}
            </p>
          )}
        </div>

        {/* Progress border */}
        <svg className="absolute top-4 left-0 w-80 h-80 rotate-[149.5deg] pointer-events-none">
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            strokeWidth="17"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-500 stroke-lightElements dark:stroke-darkElements"
          />
        </svg>
      </div>
      <div className="flex justify-center gap-4">{timerControllers()}</div>
    </div>
  );
}
