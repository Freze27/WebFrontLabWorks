import { useState, useEffect } from "react";
import { useI18n } from "../../hooks/useI18n";

export default function LocationTimeCard({ city }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { lang } = useI18n();

  useEffect(() => {
    setCurrentDate(new Date());
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [lang]);

  if (!city) return null;

  const locale = lang === "ru" ? "ru-RU" : "en-US";
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const dayName = currentDate.toLocaleDateString(locale, { weekday: "long" });
  const day = currentDate.getDate();
  const monthName = currentDate.toLocaleDateString(locale, { month: "short" });

  return (
    <div className="flex flex-col items-center justify-center bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[100px] py-[55px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] max-w-[510px] h-[330px] transition-colors duration-300 leading-[1]">
      <h2 className="text-[36px] font-bold mb-[63px]">{city.name}</h2>
      <p className="text-[96px] font-bold mb-[5px]">
        {hours}:{minutes}
      </p>
      <p className="text-[20px] font-normal">
        {dayName}, {day} {monthName}
      </p>
    </div>
  );
}

