import SunCycle from "./SunCycle";
import WeatherMetrics from "./WeatherMetrics";

export default function CurrentWeatherCard({ weather }) {
  if (!weather) {
    return <div className="w-full h-[330px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"/>;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const description = weather.weather[0].description;

  return (
    <div
      className="flex items-center justify-between bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[25px] py-[15px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] flex-1 transition-colors duration-300"
    >
      <SunCycle weather={weather} />
      <div className="flex flex-col items-center justify-center">
        <img src={iconUrl} alt={description} />
        <h2 className="text-[32px] font-bold text-center capitalize">
          {description}
        </h2>
      </div>
      <WeatherMetrics weather={weather} />
    </div>
  );
}
