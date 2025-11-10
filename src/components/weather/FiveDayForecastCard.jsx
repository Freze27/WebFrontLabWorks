import { useUnits } from "../../hooks/useUnits";
import { useI18n } from "../../hooks/useI18n";

export default function FiveDayForecastCard({ forecast }) {
  const { units } = useUnits();
  const { lang } = useI18n();

  const tempSymbol = units === "metric" ? "°C" : "°F";

  const texts = {
    en: {
      title: "5 Days Forecast:",
      noData: "No forecast data available",
    },
    ru: {
      title: "Прогноз на 5 дней:",
      noData: "Нет данных о прогнозе",
    },
  };

  const t = texts[lang] || texts.en;

  if (!forecast || forecast.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300">
        {t.noData}
      </div>
    );
  }

  return (
    <div className="flex flex-col font-bold items-center justify-between bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[15px] pt-[10px] pb-[0px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] w-[414px] h-[366px] transition-colors duration-300">
      <h2 className="text-[32px]">{t.title}</h2>
      <div className="flex flex-col w-full max-w-[369px]">
        {forecast.map((day) => {
          const date = new Date(day.date);
          const locale = lang === "ru" ? "ru-RU" : "en-US";
          const formatterWeekday = new Intl.DateTimeFormat(locale, { weekday: "long" });
          const formatterDay = new Intl.DateTimeFormat(locale, { day: "numeric" });
          const formatterMonth = new Intl.DateTimeFormat(locale, { month: "short" });
          const formattedDate = `${formatterWeekday.format(date)}, ${formatterDay.format(date)} ${formatterMonth.format(date)}`;
          const temp = Math.round(day.temp);
          const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

          return (
            <div
              key={day.date}
              className="flex items-center justify-between w-[340px] h-[60px]"
            >
              <div className="w-[60px] flex justify-center">
                <img src={iconUrl} alt={day.description} className="w-[60px] h-[60px]" />
              </div>
              <div className="w-[62px] text-center text-[20px] font-bold">
                {temp}{tempSymbol}
              </div>
              <div className="w-[163px] text-left text-[20px] capitalize font-normal" style={{ whiteSpace: "nowrap" }}>
                {formattedDate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}