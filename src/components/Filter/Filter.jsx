import { useState, useContext, useEffect, useMemo } from "react";
import { CarsContext, ActionKind } from "../../contexts/CarsContext";

const filterData = [
  {
    title: "TYPE",
    options: ["Sport", "SUV", "MVP", "Sedan", "Coupe", "Hatchback"],
  },
  {
    title: "CAPACITY",
    options: ["2", "4", "6", "8"],
  },
];

export default function Filter() {
  const { dispatch, cars } = useContext(CarsContext);
  const [checked, setChecked] = useState([]);

  const maxPriceLimit = useMemo(() => {
    if (cars.length === 0) return 200;
    return Math.ceil(Math.max(...cars.map((car) => car.daily_rate || 0)) / 10) * 10;
  }, [cars]);

  const [maxPriceValue, setMaxPriceValue] = useState(maxPriceLimit);

  const minHpLimit = useMemo(() => {
    if (cars.length === 0) return 0;
    return Math.floor(Math.min(...cars.map((car) => car.horse_power || 0)) / 10) * 10;
  }, [cars]);

  const maxHpLimit = useMemo(() => {
    if (cars.length === 0) return 1000;
    return Math.ceil(Math.max(...cars.map((car) => car.horse_power || 0)) / 10) * 10;
  }, [cars]);

  const [minHpValue, setMinHpValue] = useState(minHpLimit);
  const [maxHpValue, setMaxHpValue] = useState(maxHpLimit);

  useEffect(() => {
    setMaxPriceValue(maxPriceLimit);
  }, [maxPriceLimit]);

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_Price_Min_Query, payload: 0 });
  }, [dispatch]);

  const handleChange = (e) => {
    const newChecks = [...checked];
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setChecked([...newChecks, e.target.value]);
      } else {
        const index = checked.indexOf(e.target.value);
        if (index > -1) {
          newChecks.splice(index, 1);
          setChecked(newChecks);
        }
      }
    } else if (e.target.name === "maxPrice") {
      const value = parseInt(e.target.value, 10);
      setMaxPriceValue(value);
    } else if (e.target.name === "minHp") {
      const value = parseInt(e.target.value, 10);
      setMinHpValue((prev) => {
        const clamped = Math.min(value, maxHpValue - 10);
        return Number.isNaN(clamped) ? prev : clamped;
      });
    } else if (e.target.name === "maxHp") {
      const value = parseInt(e.target.value, 10);
      setMaxHpValue((prev) => {
        const clamped = Math.max(value, minHpValue + 10);
        return Number.isNaN(clamped) ? prev : clamped;
      });
    }
  };

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_Type_Query, payload: checked });
  }, [checked, dispatch]);

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_Price_Max_Query, payload: maxPriceValue });
  }, [maxPriceValue, dispatch]);

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_HP_Min_Query, payload: minHpValue });
  }, [minHpValue, dispatch]);

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_HP_Max_Query, payload: maxHpValue });
  }, [maxHpValue, dispatch]);

  return (
    <div className="w-full rounded-[28px] border border-white/70 bg-[#dadee2] p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-white">
          Search Filters
        </h3>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Cars
        </span>
      </div>

      <div className="mt-6 space-y-8">
        {filterData.map((data) => (
          <div
            key={data.title}
            className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-inner dark:border-gray-700 dark:bg-gray-800/70"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
              {data.title}
            </h4>
            <div className="mt-4 space-y-2">
              {data.options.map((option) => (
                <label
                  key={option}
                  htmlFor={option}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-200 dark:bg-gray-900 dark:text-gray-200"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={option}
                      onChange={handleChange}
                      name={option}
                      value={option}
                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 dark:border-gray-600"
                    />
                    {option}
                  </span>
                  {checked.includes(option) && (
                    <span className="text-xs font-semibold text-blue-500">Selected</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-inner dark:border-gray-700 dark:bg-gray-800/70">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
          <span>Max Price</span>
          <span className="text-base tracking-normal text-gray-900 dark:text-white">
            ${maxPriceValue}
          </span>
        </div>
        <div className="mt-4 relative h-6">
          <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200 dark:bg-gray-700" />
          <input
            type="range"
            id="maxPrice"
            min="0"
            max={maxPriceLimit}
            step="5"
            value={maxPriceValue}
            onChange={handleChange}
            name="maxPrice"
            className="absolute inset-0 w-full h-6 accent-blue-500 bg-transparent"
          />
        </div>
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          Showing cars priced up to ${maxPriceValue} per day
        </p>
      </div>

      <div className="mt-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-inner dark:border-gray-700 dark:bg-gray-800/70">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
          <span>Horse Power</span>
          <span className="text-base tracking-normal text-gray-900 dark:text-white">
            {minHpValue} - {maxHpValue} HP
          </span>
        </div>
        <div className="mt-4 relative h-6">
          <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200 dark:bg-gray-700" />
          <input
            type="range"
            id="minHp"
            name="minHp"
            min={minHpLimit}
            max={maxHpLimit}
            step="5"
            value={minHpValue}
            onChange={handleChange}
            className="absolute inset-0 w-full h-6 accent-blue-500 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto bg-transparent"
          />
          <input
            type="range"
            id="maxHp"
            name="maxHp"
            min={minHpLimit}
            max={maxHpLimit}
            step="5"
            value={maxHpValue}
            onChange={handleChange}
            className="absolute inset-0 w-full h-6 accent-blue-500 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto bg-transparent"
          />
        </div>
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          Showing cars with {minHpValue}–{maxHpValue} HP
        </p>
      </div>
    </div>
  );
}
