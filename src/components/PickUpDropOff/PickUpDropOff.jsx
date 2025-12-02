import { useEffect, useRef, useState } from "react";
import PickupBG from "../../assets/background/pickup_bg.png";
import DropoffBG from "../../assets/background/dropoff_bg.png";
import { usePickUpDropOffContext } from "../../contexts/PickUpDropOffContext";
import { CITIES, TIME } from "../../utils/constants";

const fieldWrapper =
  "flex h-[52px] items-center rounded-2xl border border-gray-100 bg-white px-4 text-sm font-semibold text-gray-900 shadow-inner focus-within:border-blue-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";

const inputClass =
  "w-full bg-transparent text-sm font-semibold text-gray-900 outline-none dark:text-white";

const DropdownField = ({ label, value, placeholder, options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <label className="relative flex flex-col gap-2" ref={wrapperRef}>
      <span className={labelClass}>{label}</span>
      <button
        type="button"
        className={`${fieldWrapper} justify-between`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`truncate ${
            value
              ? "text-gray-900 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {value || placeholder}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
          <ul className="max-h-56 overflow-y-auto py-2">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {option}
                  {value === option && (
                    <span className="text-xs font-semibold text-blue-500">
                      Selected
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </label>
  );
};

function LocationCard({
  title,
  description,
  locationValue,
  onLocationChange,
  dateValue,
  onDateChange,
  timeValue,
  onTimeChange,
  background,
  accent,
}) {
  return (
    <div
      className="relative isolate flex-1 overflow-hidden rounded-3xl border border-white/40 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-gray-700 dark:bg-gray-900/80"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 dark:from-gray-900/90 dark:to-gray-900/50" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2"
            style={{ borderColor: accent, backgroundColor: accent }}
          />
          <div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DropdownField
            label="Location"
            value={locationValue}
            placeholder="Select your city"
            options={CITIES.slice(0, 20)}
            onSelect={onLocationChange}
          />

          <label className="flex flex-col gap-2">
            <span className={labelClass}>Date</span>
            <div className={fieldWrapper}>
              <input
                type="date"
                value={dateValue}
                onChange={(e) => onDateChange(e.target.value)}
                className={inputClass}
              />
            </div>
          </label>

          <DropdownField
            label="Time"
            value={timeValue}
            placeholder="Select time"
            options={TIME}
            onSelect={onTimeChange}
          />
        </div>
      </div>
    </div>
  );
}

function LocationSwitcher({ onSwap }) {
  return (
    <>
      <button
        type="button"
        onClick={onSwap}
        className="hidden h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 dark:border-gray-700 dark:bg-gray-900 dark:text-white lg:flex"
        aria-label="Swap pick-up and drop-off"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16h12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m8 20-4-4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 8H7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m16 12 4-4-4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={onSwap}
        className="lg:hidden rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        Swap locations
      </button>
    </>
  );
}

export default function PickUpDropOff() {
  const {
    state,
    locationOneChange,
    locationTwoChange,
    dateOneChange,
    dateTwoChange,
    timeOneChange,
    timeTwoChange,
  } = usePickUpDropOffContext();

  const swapLocations = () => {
    locationOneChange(state.location2);
    locationTwoChange(state.location1);
    timeOneChange(state.time2);
    timeTwoChange(state.time1);
    dateOneChange(state.date2);
    dateTwoChange(state.date1);
  };

  return (
    <section className="padding-layout-home mb-10 flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        <LocationCard
          title="Pick-Up"
          description="Select pick-up info"
          locationValue={state.location1}
          onLocationChange={locationOneChange}
          dateValue={state.date1}
          onDateChange={dateOneChange}
          timeValue={state.time1}
          onTimeChange={timeOneChange}
          background={PickupBG}
          accent="#3563E9"
        />

        <LocationSwitcher onSwap={swapLocations} />

        <LocationCard
          title="Drop-Off"
          description="Select drop-off info"
          locationValue={state.location2}
          onLocationChange={locationTwoChange}
          dateValue={state.date2}
          onDateChange={dateTwoChange}
          timeValue={state.time2}
          onTimeChange={timeTwoChange}
          background={DropoffBG}
          accent="#5CAFFC"
        />
      </div>
    </section>
  );
}
