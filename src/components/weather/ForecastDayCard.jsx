export default function ForecastDayCard({ day }) {
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" });
  return (
    <div className="bg-white dark:bg-[#3A3A3A] rounded-lg shadow-md dark:shadow-lg p-4 flex flex-col items-center">
      <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">{dayName}</div>
      <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} className="w-16 h-16" />
      <div className="text-2xl font-bold mt-2 dark:text-white">{Math.round(day.temp)}°C</div>
      <div className="text-sm mt-1 capitalize dark:text-white">{day.description}</div>
    </div>
  );
}
