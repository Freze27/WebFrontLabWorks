import { useLocalStorage } from "./useLocalStorage";

export function useUnits() {
  const [units, setUnits] = useLocalStorage("units", "metric");
  const toggleUnits = () => setUnits(u => (u === "metric" ? "imperial" : "metric"));
  return { units, setUnits, toggleUnits };
}
