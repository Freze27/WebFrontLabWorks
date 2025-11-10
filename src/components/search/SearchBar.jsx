import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchJson } from "../../hooks/useFetchJson";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useI18n } from "../../hooks/useI18n";
import SearchIcon from "../../assets/SearchIcon.png";

export default function SearchBar({ onSelectCity }) {
  const { lang } = useI18n();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const apiKey = import.meta.env.VITE_OWM_API_KEY;
  const url = debouncedQuery
    ? `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        debouncedQuery
      )}&limit=5&lang=${lang}&appid=${apiKey}`
    : null;

  const { data: suggestions, loading, error } = useFetchJson(url, [
    debouncedQuery,
    lang,
  ]);

  const [history, setHistory] = useLocalStorage("weather_history", []);

  const addToHistory = (city) => {
    setHistory((prev) => {
      const newHistory = [
        city,
        ...prev.filter(
          (c) =>
            c.lat !== city.lat || c.lon !== city.lon || c.name !== city.name
        ),
      ];
      return newHistory.slice(0, 5);
    });
  };

  const handleSelect = (city) => {
    onSelectCity(city);
    addToHistory(city);
    setQuery("");
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".searchbar-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const texts = {
    en: {
      placeholder: "Search for your preffered city...",
      loading: "Loading...",
      error: "Error: Failed to fetch data from API",
    },
    ru: {
      placeholder: "Найдите нужный вам город…",
      loading: "Загрузка...",
      error: "Ошибка: Не удалось получить данные с API",
    },
  };

  const t = texts[lang] || texts.en;

  return (
    <div className="w-full max-w-[600px] mx-auto relative searchbar-container">
      <form className="flex relative items-center">
        <img
          src={SearchIcon}
          alt="Search"
          className="w-[40px] h-[46px] absolute left-4 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder={t.placeholder}
          className="
                        flex-1
                        rounded-[40px]
                        px-[33px] py-[15px] pl-[70px]
                        font-poppins font-normal text-1.1
                        bg-[#D9D9D9] dark:bg-[#444444]
                        border border-black dark:border-transparent
                        placeholder-[#292929] dark:placeholder-[rgba(255,255,255,0.6)]
                        transition-colors duration-300
                    "
          autoComplete="off"
        />
      </form>

      {showDropdown && (
        <ul className="absolute left-0 right-0 bg-white dark:bg-[#444444] border border-black dark:border-transparent mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto dark:text-white">
          {loading && (
            <li className="px-4 py-2">{t.loading}</li>
          )}
          {error && (
            <li className="px-4 py-2 text-red-500">{t.error}</li>
          )}

          {Array.isArray(suggestions) && suggestions.length > 0
            ? suggestions.map((city) => (
                <li
                  key={city.lat + city.lon}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleSelect(city)}
                >
                  {city.name}
                  {city.state ? `, ${city.state}` : ""}
                  {city.country ? `, ${city.country}` : ""}
                </li>
              ))
            : !debouncedQuery &&
              history.map((city) => (
                <li
                  key={city.lat + city.lon}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center"
                  onClick={() => handleSelect(city)}
                >
                  <span className="opacity-70 mr-2">🕓</span>
                  {city.name}
                  {city.state ? `, ${city.state}` : ""}
                  {city.country ? `, ${city.country}` : ""}
                </li>
              ))}
        </ul>
      )}
      {loading && <p className="mt-2 text-gray-500">{t.loading}</p>}
      {error && <p className="mt-2 text-red-500">{t.error}</p>}
    </div>
  );
}
