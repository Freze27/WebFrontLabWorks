import CarCard from "../CarCard/CarCard";

export default function CarSection({ title, cars = [] }) {
  if (!cars.length) {
    return null;
  }

  return (
    <section className="padding-layout-home mt-8 mb-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="h1-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="grid w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}

