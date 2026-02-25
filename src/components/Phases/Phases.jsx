import { useTimer } from "../../shared/hooks/useTimer";

export default function Phases() {
  const { sessionCount, setSessionCount, phaseType } = useTimer();
  
  return (
    <div className="bg-light dark:bg-dark p-3 mt-2 mx-5 rounded-full flex flex-row justify-center gap-6 items-center">
      <p className="text-lightElements dark:text-darkElements text-lg">
        {phaseType === "work" ? "Work" : phaseType === "break" ? "Break" : "Long Break"} - Session {sessionCount}/4
      </p>
      <div className="bg-lightElements dark:bg-darkElements w-2 h-2 rounded-full">
      </div>
      <div className="bg-lightElements dark:bg-darkElements w-2 h-2 rounded-full">
      </div>
      <div className="bg-lightElements dark:bg-darkElements w-2 h-2 rounded-full">
      </div>
      <div className="bg-lightElements dark:bg-darkElements w-2 h-2 rounded-full">
      </div>
    </div>
  );
}
