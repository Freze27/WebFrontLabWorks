import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserContextObj } from "../../contexts/UserContext";

const PICKUP_LOCATIONS = [
  "Airport Terminal A",
  "Airport Terminal B",
  "City Center Office",
  "Train Station Office",
];

export default function Rent() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const userObject = useContext(UserContextObj);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);

  useEffect(() => {
    if (userObject && userObject._id) {
      const nameFromFields = `${userObject.firstName || ""} ${userObject.lastName || ""}`
        .trim();
      const displayName = nameFromFields || userObject.displayName || "";
      setFullName(displayName);
      if (userObject.email) {
        setEmail(userObject.email);
      }
    }
  }, [userObject]);

  const rentalDays = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 0;

    const start = pickupDate;
    const end = dropoffDate;
    const diffTime = end.getTime() - start.getTime();

    if (Number.isNaN(diffTime) || diffTime <= 0) return 0;

    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.round(diffDays));
  }, [pickupDate, dropoffDate]);

  const totalPrice = useMemo(() => {
    if (!car || !rentalDays) return 0;
    return rentalDays * (car.daily_rate || 0);
  }, [car, rentalDays]);

  if (!car) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
          <div className="padding-layout py-8">
            <h1 className="h1-bold text-gray-900 dark:text-white mb-4">
              No car selected for rent
            </h1>
            <Link to="/" className="text-blue-500 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleConfirm = (event) => {
    event.preventDefault();

    if (!pickupDate || !dropoffDate || rentalDays <= 0) {
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Форма аренды */}
        <form
          onSubmit={handleConfirm}
          className="lg:col-span-2 bg-white-0 dark:bg-gray-800 rounded-[10px] p-6 shadow-md space-y-6"
        >
          <h1 className="h2-bold text-gray-900 dark:text-white mb-2">
            Rental Information
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Please fill in your details and rental period. Payment will be
            completed in our office.
          </p>

          {/* Личные данные */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Pick-up / Drop-off Location
                </label>
                <select
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                >
                  {PICKUP_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Даты аренды */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Rental Period
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select pick-up and drop-off dates. Total price will be calculated
              automatically.
            </p>

            <div className="rounded-[10px] border border-gray-200 bg-white-0 p-4 dark:border-gray-700 dark:bg-gray-900 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Pick-up Date
                </label>
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => {
                    setPickupDate(date);
                    if (dropoffDate && date && dropoffDate <= date) {
                      setDropoffDate(null);
                    }
                  }}
                  minDate={new Date()}
                  dateFormat="MMM d, yyyy"
                  calendarClassName="rental-datepicker"
                  popperClassName="rental-datepicker-popper"
                  placeholderText="Select pick-up date"
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Drop-off Date
                </label>
                <DatePicker
                  selected={dropoffDate}
                  onChange={(date) => setDropoffDate(date)}
                  minDate={pickupDate ? new Date(pickupDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                  disabled={!pickupDate}
                  dateFormat="MMM d, yyyy"
                  calendarClassName="rental-datepicker"
                  popperClassName="rental-datepicker-popper"
                  placeholderText={pickupDate ? "Select drop-off date" : "Select pick-up first"}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  required
                />
              </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Total days
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {rentalDays || "-"}
                </span>
              </div>
            </div>
          </section>

          <button type="submit" className="btn-primary w-full md:w-auto">
            Confirm and Rent Now
          </button>
        </form>

        {/* Сводка по машине */}
        <aside className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-6 shadow-md space-y-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Rental Summary
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={car.file_path}
              alt={car.car_title}
              className="h-20 w-32 object-contain rounded-md bg-white-200 dark:bg-gray-900"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {car.car_title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {car.car_body_type}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Daily Rate
            </span>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              ${car.daily_rate}/day
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total ({rentalDays || 0} days)
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Payment will be processed in our office at{" "}
            <span className="font-semibold">{pickupLocation}</span>.
          </p>
        </aside>
      </div>
      <Footer />
    </div>
  );
}


