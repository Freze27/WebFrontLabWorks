import { useState, useEffect, useRef } from "react";
import Header from "./components/layout/Header";
import { useWeather } from "./hooks/useWeather";
import { useI18n } from "./hooks/useI18n";
import { useUnits } from "./hooks/useUnits";
import LocationTimeCard from "./components/weather/LocationTimeCard";
import CurrentWeatherCard from "./components/weather/CurrentWeatherCard";
import FiveDayForecastCard from "./components/weather/FiveDayForecastCard";
import HourlyForecastCard from "./components/weather/HourlyForecastCard";
import { useAirQuality } from "./hooks/useAirQuality";
import AQICard from "./components/weather/AQICard";
import Loader from "./components/common/Loader";
import ErrorState from "./components/common/ErrorState";
import EmptyState from "./components/common/EmptyState";

function App() {
  const [city, setCity] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { lang } = useI18n();
  const { units } = useUnits();
  const prevLangRef = useRef(lang);
  const prevUnitsRef = useRef(units);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevLangRef.current = lang;
      prevUnitsRef.current = units;
      return;
    }
    
    if (prevLangRef.current !== lang || prevUnitsRef.current !== units) {
      prevLangRef.current = lang;
      prevUnitsRef.current = units;
      setRefreshKey(prev => prev + 1);
    }
  }, [lang, units]);
  
  const weather = useWeather(city?.lat, city?.lon, units, lang);
  const air = useAirQuality(city?.lat, city?.lon);

  useEffect(() => {
    if (city) {
      setLocationLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setLocationLoading(false);
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_OWM_API_KEY;
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            const location = data[0];
            setCity({
              name: location.name,
              country: location.country,
              state: location.state,
              lat: latitude,
              lon: longitude,
            });
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(112.65deg,#FFFFFF_0.28%,rgba(70,97,115,0)_178.65%)] dark:bg-[linear-gradient(110.05deg,#383838_0%,rgba(158,158,158,0)_71.82%)] bg-[#1E1E1E] font-poppins text-[rgba(41,41,41,1)] dark:text-[#FFFFFF]">
      <div className="w-full max-w-[1350px] mx-auto py-[80px] px-4">
        <Header onSelectCity={setCity} />

      {(weather.loading || locationLoading) && <Loader />}
      {weather.error && <ErrorState message={weather.error} />}

      {!weather.loading && !locationLoading && !weather.error && !weather.current && city && (
        <EmptyState />
      )}

      {!weather.loading && !locationLoading && !weather.error && !weather.current && !city && (
        <EmptyState />
      )}

      {weather.current && city && !weather.loading && (
        <div key={`weather-${lang}-${units}-${refreshKey}`} className="py-[50px] flex flex-col gap-[55px]">
          <div className="flex gap-[55px]">
            <LocationTimeCard key={`location-${lang}-${refreshKey}`} city={city} />
            <CurrentWeatherCard key={`current-${lang}-${units}-${refreshKey}`} weather={weather.current} />
          </div>

          <div className="flex gap-[55px]">
            <FiveDayForecastCard key={`forecast-${lang}-${units}-${refreshKey}`} forecast={weather.forecast} />
            <HourlyForecastCard key={`hourly-${lang}-${units}-${refreshKey}`} hourlyData={weather.hourly} />
          </div>
        </div>
      )}

      {city && air.loading && <Loader />}
      {city && air.error && <ErrorState message={air.error} />}
      {city && !air.loading && !air.error && !air.aqi && <EmptyState />}
      {city && air.aqi && (
        <div key={`aqi-${lang}-${refreshKey}`} className="mt-6">
          <AQICard aqi={air.aqi} AQI_LEVELS={air.AQI_LEVELS} />
        </div>
      )}
      </div>
    </div>
  );
}


export default App;
