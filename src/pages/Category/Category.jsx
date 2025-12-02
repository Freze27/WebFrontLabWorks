import { useContext, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { CarsContext } from "../../contexts/CarsContext";
import CarCard from "../../components/CarCard/CarCard";
import Filter from "../../components/Filter/Filter";

export default function Category() {
  const {
    cars,
    filterType,
    filterPriceMin,
    filterPriceMax,
    filterHpMin,
    filterHpMax,
  } = useContext(CarsContext);
  const [filteredCars, setFilteredCars] = useState(cars);

  useEffect(() => {
    let result = cars;

    if (filterType.length > 0) {
      result = result.filter((car) =>
        filterType.some(
          (filter) =>
            filter.includes(car.car_body_type) ||
            parseInt(filter) <= car.seat_capacity
        )
      );
    }

    const maxAvailablePrice =
      cars.length > 0 ? Math.max(...cars.map((car) => car.daily_rate || 0)) : 0;

    if (
      filterPriceMin > 0 ||
      (maxAvailablePrice > 0 && filterPriceMax < maxAvailablePrice)
    ) {
      result = result.filter(
        (car) => car.daily_rate >= filterPriceMin && car.daily_rate <= filterPriceMax
      );
    }

    if (cars.length > 0 && (filterHpMin > 0 || filterHpMax < 2000)) {
      result = result.filter((car) => {
        const hp = car.horse_power || 0;
        return hp >= filterHpMin && hp <= filterHpMax;
      });
    }

    setFilteredCars(result);
  }, [cars, filterType, filterPriceMin, filterPriceMax, filterHpMin, filterHpMax]);

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8">
        <h1 className="h1-bold text-gray-900 dark:text-white mb-8">All Cars</h1>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="w-full lg:sticky lg:top-24">
            <Filter />
          </div>
          <div className="flex-1 w-full min-w-0">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            ) : (
              <div className="w-full rounded-3xl border border-dashed border-gray-300 bg-white/80 p-10 text-left shadow-inner dark:border-gray-700 dark:bg-gray-800/80">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  No cars match the filters
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Try adjusting the vehicle type or the maximum price to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
