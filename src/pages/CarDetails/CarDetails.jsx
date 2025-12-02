import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const galleryImages =
    car?.gallery_images?.length > 0 ? car.gallery_images : car?.file_path ? [car.file_path] : [];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  useEffect(() => {
    const images =
      car?.gallery_images?.length > 0 ? car.gallery_images : car?.file_path ? [car.file_path] : [];
    setActiveImage(images[0]);
  }, [car]);

  const handleRentNowClick = () => {
    if (!car) return;
    navigate("/rent", { state: { car } });
  };

  if (!car) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
          <div className="padding-layout py-8">
            <h1 className="h1-bold text-gray-900 dark:text-white mb-4">Car not found</h1>
            <Link to="/" className="text-blue-500 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8">
        <h1 className="h1-bold text-gray-900 dark:text-white mb-4">
          {car.car_title} - {car.car_brand}
        </h1>
        <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-4 shadow-lg mb-4">
          <img
            src={activeImage}
            alt={car.car_title}
            className="w-full max-w-4xl h-auto rounded-[10px] object-cover"
          />
        </div>
        {galleryImages.length > 1 && (
          <div className="flex flex-wrap gap-4 mb-8">
            {galleryImages.map((image) => {
              const isActive = image === activeImage;
              return (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`rounded-lg border-2 p-1 transition-colors ${
                    isActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                      : "border-transparent hover:border-blue-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.car_title} view`}
                    className="h-20 w-32 object-cover rounded-md"
                  />
                </button>
              );
            })}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
            <div className="text-sm text-gray-400 dark:text-gray-400 mb-2">Body Type</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.car_body_type}
            </div>
          </div>
          <div className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
            <div className="text-sm text-gray-400 dark:text-gray-400 mb-2">Seat Capacity</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.seat_capacity} People
            </div>
          </div>
          <div className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
            <div className="text-sm text-gray-400 dark:text-gray-400 mb-2">Fuel</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.maximum_gasoline === 0 ? "Electric" : `${car.maximum_gasoline}L`}
            </div>
          </div>
          <div className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
            <div className="text-sm text-gray-400 dark:text-gray-400 mb-2">Transmission</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.transmission_type}
            </div>
          </div>
          <div className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
            <div className="text-sm text-gray-400 dark:text-gray-400 mb-2">Horse Power</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.horse_power ? `${car.horse_power} HP` : "N/A"}
            </div>
          </div>
          <div className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
            <div className="text-sm text-gray-400 dark:text-gray-400 mb-2">Daily Rate</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              ${car.daily_rate}/day
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRentNowClick}
          className="btn-rent inline-block"
        >
          Rent Now
        </button>
      </div>
      <Footer />
    </div>
  );
}
