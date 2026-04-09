import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList/TodoList";
import { useTranslation } from "../../shared/i18n/translations";
import { browserAPI } from "../../shared/utils/browserAPI";

export default function TodoPage() {
  const [started, setStarted] = useState(false);
  const { t } = useTranslation("ToDoTasks");

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const firststart = await browserAPI.storage.local.get(["start"]);
        if (firststart.start === true) {
          setStarted(true);
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkStorage();
  }, []);

  const handleFirstStart = async () => {
    try {
      await browserAPI.storage.local.set({ start: true });
      setStarted(true);
    } catch (error) {
      console.error("Failed to save storage:", error);
    }
  };

  if (!started) {
    return (
      <div className="bg-light dark:bg-dark min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-8">
          <img
            src="/icons/todo.png"
            alt="Todo List"
            className="w-64 h-64 object-contain opacity-80 dark:opacity-70"
          />
          <h1 className="text-4xl font-bold text-lightElements dark:text-darkElements text-center">
            {t("helloHeader")}
          </h1>
          <p className="text-lg text-lightPlaceHolder dark:text-darkPlaceHolder text-center max-w-md">
            {t("descHeader")}
          </p>
          <button
            onClick={() => handleFirstStart()}
            className="px-8 py-4 bg-gradient-to-r from-lightList to-lightElements dark:from-purple-600 dark:to-purple-400 hover:from-purple-500 hover:to-purple-700 text-light dark:text-dark font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {t("start")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <TodoList />
    </div>
  );
}
