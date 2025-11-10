import ForecastDayCard from "./ForecastDayCard";

export default function ForecastList({ days }) {
  if (!days?.length) return null;
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {days.map(day => (
        <ForecastDayCard key={day.date} day={day} />
      ))}
    </div>
  );
}
