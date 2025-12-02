import PickupBG from "../../assets/background/pickup_bg.png";
import carImage from "../../assets/cars/car2.png";

export default function PrimaryCard() {
  return (
    <div
      className="relative isolate min-h-[320px] overflow-hidden rounded-3xl bg-blue-600 text-white shadow-xl sm:min-h-[360px] lg:min-h-[420px]"
      style={{
        backgroundImage: `url(${PickupBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-700/60 to-blue-500/40 dark:from-blue-950/90 dark:via-blue-900/80 dark:to-blue-700/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center">
        <img
          src={carImage}
          alt="Premium rental car"
          className="w-[75%] max-w-[420px] min-w-[220px] select-none object-contain drop-shadow-2xl sm:w-[65%]"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col gap-4 p-6 pb-20 sm:p-8 sm:pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          Premium Experience
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
            The Best Platform for Car Rental
          </h2>
          <p className="max-w-md text-sm text-white/80 sm:text-base">
            Ease of doing a car rental safely and reliably. Of course at a low price.
          </p>
        </div>
      </div>
    </div>
  );
}

