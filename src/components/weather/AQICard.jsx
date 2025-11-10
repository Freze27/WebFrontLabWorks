import { useI18n } from "../../hooks/useI18n";

export default function AQICard({ aqi, AQI_LEVELS }) {
  const { lang } = useI18n();

  if (!aqi) return null;

  const level = AQI_LEVELS.find(l => l.level === aqi.main.aqi) || AQI_LEVELS[2];

  const texts = {
    en: {
      title: "Air Quality (AQI):",
      pm: "PM2.5",
      pm10: "PM10",
      co: "CO",
    },
    ru: {
      title: "Качество воздуха (AQI):",
      pm: "PM2.5",
      pm10: "PM10",
      co: "CO",
    },
  };

  const t = texts[lang] || texts.en;
  const levelLabel = typeof level.label === 'object' ? level.label[lang] || level.label.en : level.label;

  return (
    <div className={`mt-8 p-4 rounded shadow flex flex-col items-center ${level.color}`}>
      <div className="text-lg font-semibold text-black">
        {t.title} {aqi.main.aqi}
      </div>

      <div className="text-base mt-1 text-black">
        {levelLabel}
      </div>

      <div className="text-xs mt-2 text-black">
        {t.pm}: {aqi.components.pm2_5} | {t.pm10}: {aqi.components.pm10} | {t.co}: {aqi.components.co}
      </div>
    </div>
  );
}
