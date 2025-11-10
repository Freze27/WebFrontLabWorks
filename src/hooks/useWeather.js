import { useState, useEffect } from "react";

function groupByDay(list) {
  return list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
}

export function useWeather(lat, lon, units = "metric", lang = "ru") {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setCurrent(null);
      setForecast([]);
      setHourly([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    setCurrent(null);
    setForecast([]);
    setHourly([]);
    
    const apiKey = import.meta.env.VITE_OWM_API_KEY;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`;

    let cancelled = false;

    Promise.all([
      fetch(currentUrl).then((res) => {
        if (!res.ok) throw new Error("Current weather error");
        return res.json();
      }),
      fetch(forecastUrl).then((res) => {
        if (!res.ok) throw new Error("Forecast error");
        return res.json();
      })
    ])
      .then(([currentData, forecastData]) => {
        if (cancelled) return;
        
        setCurrent(currentData);
        
        setHourly(forecastData.list.slice(0, 5));
        
        const grouped = groupByDay(forecastData.list);
        const days = Object.entries(grouped).slice(0, 5).map(([date, items]) => {
          const temps = items.map(i => i.main.temp);
          const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
          return {
            date,
            temp: avgTemp,
            icon: items[0].weather[0].icon,
            description: items[0].weather[0].description,
            items
          };
        });
        setForecast(days);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lon, units, lang]);

  return { current, forecast, hourly, loading, error };
}
