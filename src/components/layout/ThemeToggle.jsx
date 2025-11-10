import { useEffect, useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function ThemeToggle() {
  const { dark, toggleDark } = useDarkMode();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentDark = dark === null ? systemDark : dark;
    setIsDark(currentDark);
  }, [dark]);

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={toggleDark}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark ? "bg-gray-400" : "bg-gray-600"
        }`}
        aria-label="Переключить тему"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isDark ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className="text-xs text-gray-900 dark:text-white">Dark Mode</span>
    </div>
  );
}
