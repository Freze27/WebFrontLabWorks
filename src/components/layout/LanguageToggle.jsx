import { useI18n } from "../../hooks/useI18n";

export default function LanguageToggle() {
  const { lang, toggleLang } = useI18n();
  return (
    <button
      className="px-3 py-1 rounded border ml-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={toggleLang}
      aria-label="Переключить язык"
    >
      {lang === "ru" ? "RU" : "EN"}
    </button>
  );
}
