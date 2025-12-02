import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { CarsContext } from "../../contexts/CarsContext";
import CarCard from "../../components/CarCard/CarCard";

export default function SearchFilter() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { cars, searchItems } = useContext(CarsContext);

  const filteredCars = query
    ? cars.filter(
        (car) =>
          car.car_brand.toLowerCase().includes(query.toLowerCase()) ||
          car.car_title.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems.length > 0
    ? searchItems
    : cars;

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8">
        <h1 className="h1-bold text-gray-900 dark:text-white mb-4">Search Results</h1>
        {query && (
          <p className="text-gray-400 dark:text-gray-400 mb-4">
            Found {filteredCars.length} cars for "{query}"
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No cars found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
