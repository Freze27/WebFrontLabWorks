import { Link, useNavigate } from "react-router-dom";
import GasIcon from "../../assets/icon/GasIcon.png";
import Wheel from "../../assets/icon/Wheel.png";
import Users from "../../assets/icon/Users.png";

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/car-details", { state: { car } });
  };

  const handleRentNowClick = (event) => {
    event.stopPropagation();
    navigate("/rent", { state: { car } });
  };
  const fuelInfo = car.maximum_gasoline === 0 ? "Electric" : `${car.maximum_gasoline}L`;

  const features = [
    {
      icon: <img src={GasIcon} alt="Gas" className="h-4 w-4 md:h-6 md:w-6" />,
      title: fuelInfo,
    },
    {
      icon: <img src={Wheel} alt="Transmission" className="h-4 w-4 md:h-6 md:w-6" />,
      type: car.transmission_type || "Manual",
    },
    {
      icon: <img src={Users} alt="Seats" className="h-4 w-4 md:h-6 md:w-6" />,
      qty: `${car.seat_capacity} People`,
    },
  ];

  return (
    <article
      className="flex w-full flex-col justify-between gap-9 rounded-[10px] bg-white-0 p-4 transition-all hover:scale-105 dark:bg-gray-800 lg:p-6 shadow-md hover:shadow-lg h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <section className="flex items-center justify-between">
        <div className="w-full">
          <h1 className="truncate whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white md:text-xl md:font-bold">
            {car.car_title}
          </h1>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-400 md:text-sm md:font-bold">
            {car.car_body_type}
          </p>
        </div>
      </section>
      
      <section className="flex flex-row justify-between gap-8 text-sm text-gray-400 sm:gap-14 md:flex-col">
        <div className="flex w-full md:items-center md:justify-center">
          <div className="relative h-[115px] w-full after:absolute after:bottom-0 after:h-20 after:w-full after:bg-gradient-to-t after:from-white-0 after:to-transparent after:to-80% dark:after:from-gray-800 dark:after:to-transparent">
            <img
              src={car.file_path}
              alt={car.car_title}
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>

        <section className="flex w-24 shrink-0 flex-col gap-3 sm:w-full sm:flex-row sm:gap-2 md:flex-wrap md:items-center md:justify-between">
          {features.map((feature, index) => (
            <div key={index} className="flex shrink-0 items-center gap-2">
              {feature.icon}
              {feature.title && (
                <p className="text-xs dark:text-gray-400 md:text-sm">{feature.title}</p>
              )}
              {feature.type && (
                <p className="text-xs dark:text-gray-400 md:text-sm">{feature.type}</p>
              )}
              {feature.qty && (
                <p className="text-xs dark:text-gray-400 md:text-sm">{feature.qty}</p>
              )}
            </div>
          ))}
        </section>
      </section>
      
      <section>
        <section className="flex items-center justify-between gap-2">
          <p>
            <span className="text-base font-bold text-gray-900 dark:text-white md:text-xl">
              {`$${car.daily_rate} / `}
            </span>
            <span className="ml-1 text-xs font-bold text-gray-400 dark:text-gray-400 md:text-sm">
              day
            </span>
          </p>
          <button
            type="button"
            onClick={handleRentNowClick}
            className="btn-primary ml-6 w-[100px] md:w-fit"
          >
            Rent Now
          </button>
        </section>
      </section>
    </article>
  );
}
