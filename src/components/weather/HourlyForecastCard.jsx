import TopArrowIcon from "../../assets/navigation 1.png";
import { useUnits } from "../../hooks/useUnits";
import { useI18n } from "../../hooks/useI18n";

export default function HourlyForecastCard({ hourlyData }) {
  const { units } = useUnits();
  const { lang } = useI18n();

  const tempSymbol = units === "metric" ? "°C" : "°F";

  const texts = {
    en: {
      title: "Hourly Forecast:",
      noData: "No hourly forecast available",
      windUnit: "km/h"
    },
    ru: {
      title: "Почасовой прогноз:",
      noData: "Нет почасового прогноза",
      windUnit: "км/ч"
    }
  };

  const t = texts[lang] || texts.en;

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300">
        {t.noData}
      </div>
    );
  }

  const nextHours = hourlyData.slice(0, 5);

  return (
    <div className="h-[366px] flex flex-col font-bold
        items-center justify-between bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[15px] pt-[15px] pb-[3px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] flex-1 transition-colors duration-500"
    >
      <h2 className="text-[32px]">{t.title}</h2>
      <div className="flex items-center justify-between gap-[15px] py-[15px]">
        {nextHours.map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const time = `${date.getHours()}:00`;
          const temp = Math.round(hour.main.temp);
          const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
          const windSpeed = hour.wind?.speed || 0;
          const windDeg = hour.wind?.deg || 0;
          const speedValue = units === "metric"
            ? Math.round(windSpeed * 3.6)
            : Math.round(windSpeed * 2.237);

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-between
              ${index < 3
                ? "bg-[linear-gradient(170.72deg,#F88508_-12.41%,rgba(246,250,217,0)_163.32%)]"
                : "bg-[linear-gradient(173.72deg,#443D64_-15.92%,rgba(101,130,198,0)_192.45%)]"}
              dark:bg-[linear-gradient(170.72deg,#383838_-12.41%,rgba(158,158,158,0)_163.32%)]

              rounded-[40px] py-[10px] px-[25px] transition-all duration-500`}
            >
              <h3 className="text-[24px]">
                {time}
              </h3>
              <img src={iconUrl} alt={hour.weather[0].main}/>
              <p className="text-[20px]">
                {temp}{tempSymbol}
              </p>
              <img src={TopArrowIcon} alt="Top Arrow"
                   style={{transform: `rotate(${windDeg}deg)`}}/>
              <p className="text-[20px] font-normal">
                {speedValue} {t.windUnit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
