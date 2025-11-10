import { useLocalStorage } from "./useLocalStorage";

export function useI18n() {
  const [lang, setLang] = useLocalStorage("lang", "ru");
  const toggleLang = () => setLang(l => (l === "ru" ? "en" : "ru"));
  return { lang, setLang, toggleLang };
}
