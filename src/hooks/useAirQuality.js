import { useState, useEffect } from "react";

const AQI_LEVELS = [
  { 
    level: 1, 
    label: { ru: "Очень хорошо", en: "Very Good" }, 
    color: "bg-green-400" 
  },
  { 
    level: 2, 
    label: { ru: "Хорошо", en: "Good" }, 
    color: "bg-lime-400" 
  },
  { 
    level: 3, 
    label: { ru: "Умеренно", en: "Moderate" }, 
    color: "bg-yellow-400" 
  },
  { 
    level: 4, 
    label: { ru: "Плохо", en: "Poor" }, 
    color: "bg-orange-400" 
  },
  { 
    level: 5, 
    label: { ru: "Очень плохо", en: "Very Poor" }, 
    color: "bg-red-500" 
  },
];

export function useAirQuality(lat, lon) {
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    setLoading(true);
    setError(null);
  const apiKey = import.meta.env.VITE_OWM_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка AQI");
        return res.json();
      })
      .then((data) => setAqi(data.list[0]))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return { aqi, loading, error, AQI_LEVELS };
}
