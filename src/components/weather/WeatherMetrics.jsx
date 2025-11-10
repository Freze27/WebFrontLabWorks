import HumidityLightIcon from "../../assets/humidity-light.png";
import WindSpeedLightIcon from "../../assets/wind-light.png";
import PressureLightIcon from "../../assets/pressure-light.png";
import UVLightIcon from "../../assets/uv-light.png";

import HumidityDarkIcon from "../../assets/humidity-dark.png";
import WindSpeedDarkIcon from "../../assets/wind-dark.png";
import PressureDarkIcon from "../../assets/pressure-dark.png";
import UVDarkIcon from "../../assets/uv-dark.png";

import { useI18n } from "../../hooks/useI18n";
import { useUnits } from "../../hooks/useUnits";

export default function WeatherMetrics({ weather }) {
  const { lang } = useI18n();
  const { units } = useUnits();

  if (!weather) {
    return (
      <div className="animate-pulse grid grid-cols-2 gap-x-4 gap-y-10 w-full h-[150px] rounded-xl bg-gray-300 dark:bg-gray-700" />
    );
  }

  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const pressure = weather.main.pressure;
  const uv = 0;

  const speedValue = units === "metric"
    ? Math.round(windSpeed * 3.6)
    : Math.round(windSpeed * 2.237);
  const speedUnit = units === "metric" ? "km/h" : "mph";

  const t = {
    en: {
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      pressure: "Pressure",
      uv: "UV",
    },
    ru: {
      humidity: "Влажность",
      windSpeed: "Скорость ветра",
      pressure: "Давление",
      uv: "УФ-индекс",
    },
  }[lang];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 items-center justify-items-center">
      <div className="flex flex-col items-center text-center w-[120px]">
        <img src={HumidityLightIcon} alt="Humidity Light icon" className="dark:hidden w-10 h-10" />
        <img src={HumidityDarkIcon} alt="Humidity Dark icon" className="hidden dark:block w-10 h-10" />
        <h3 className="text-lg font-semibold mt-2">{humidity}%</h3>
        <p className="text-sm opacity-80">{t.humidity}</p>
      </div>

      <div className="flex flex-col items-center text-center w-[120px]">
        <img src={WindSpeedLightIcon} alt="Wind speed light icon" className="dark:hidden w-10 h-10" />
        <img src={WindSpeedDarkIcon} alt="Wind speed dark icon" className="hidden dark:block w-10 h-10" />
        <h3 className="text-lg font-semibold mt-2">{speedValue}{speedUnit}</h3>
        <p className="text-sm opacity-80">{t.windSpeed}</p>
      </div>

      <div className="flex flex-col items-center text-center w-[120px]">
        <img src={PressureLightIcon} alt="Pressure light icon" className="dark:hidden w-10 h-10" />
        <img src={PressureDarkIcon} alt="Pressure dark icon" className="hidden dark:block w-10 h-10" />
        <h3 className="text-lg font-semibold mt-2">{pressure}hPa</h3>
        <p className="text-sm opacity-80">{t.pressure}</p>
      </div>

      <div className="flex flex-col items-center text-center w-[120px]">
        <img src={UVLightIcon} alt="UV light icon" className="dark:hidden w-10 h-10" />
        <img src={UVDarkIcon} alt="UV dark icon" className="hidden dark:block w-10 h-10" />
        <h3 className="text-lg font-semibold mt-2">{uv}</h3>
        <p className="text-sm opacity-80">{t.uv}</p>
      </div>
    </div>
  );
}
