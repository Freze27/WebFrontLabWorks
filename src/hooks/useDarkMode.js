import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useDarkMode() {
  const [dark, setDark] = useLocalStorage("dark_mode", null);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark === null) {
      root.classList.toggle("dark", systemDark);
    } else {
      root.classList.toggle("dark", dark);
    }
  }, [dark]);

  const toggleDark = () => setDark((d) => (d === null ? true : !d));

  return { dark: dark === null ? undefined : dark, setDark, toggleDark };
}
