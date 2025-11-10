import { useUnits } from "../../hooks/useUnits";

export default function UnitsToggle() {
  const { units, toggleUnits } = useUnits();
  return (
    <button
      className="px-3 py-1 rounded border ml-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={toggleUnits}
      aria-label="Переключить единицы"
    >
      {units === "metric" ? "°C" : "°F"}
    </button>
  );
}
