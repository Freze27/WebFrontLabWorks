import Toggle from "./Toggle";
import SearchBar from "../search/SearchBar";
import CurrentLocationButton from "../search/CurrentLocationButton";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useUnits } from "../../hooks/useUnits";
import { useI18n } from "../../hooks/useI18n";
import { useEffect } from "react";

export default function Header({ onSelectCity }) {
  const { dark, setDark } = useDarkMode();
  const { units, setUnits } = useUnits();
  const { lang: currentLang, setLang } = useI18n();

  const theme = dark === undefined 
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : (dark ? "dark" : "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setDark(newTheme === "dark");
  };

  return (
    <div className="flex justify-between items-center w-full flex-wrap gap-4">
      <Toggle
        value={theme}
        onChange={handleThemeChange}
        options={["light", "dark"]}
        labels={["Light Mode", "Dark Mode"]}
      />
      <Toggle
        value={units}
        onChange={setUnits}
        options={["metric", "imperial"]}
        labels={["metric", "imperial"]}
      />
      <Toggle
        value={currentLang}
        onChange={setLang}
        options={["ru", "en"]}
        labels={["RU", "EN"]}
      />
      <div className="flex-1 min-w-[200px] max-w-[600px]">
        <SearchBar key={`search-${currentLang}`} onSelectCity={onSelectCity} />
      </div>
      <CurrentLocationButton key={`location-btn-${currentLang}`} onSelectCity={onSelectCity} />
    </div>
  );
}
