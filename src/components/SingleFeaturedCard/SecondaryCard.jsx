import DropoffBG from "../../assets/background/dropoff_bg.png";
import carImage from "../../assets/cars/car3.png";

export default function SecondaryCard() {
  const patternSvg = `<?xml version='1.0' encoding='UTF-8'?>
  <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
    <defs>
      <pattern id='chev' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M0 30 L10 20 L20 30 L30 20 L40 30 L30 40 L20 30 L10 40 Z' fill='#93C5FD'/>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#chev)' />
  </svg>`;
  return (
    <div
      className="relative isolate min-h-[320px] overflow-hidden rounded-3xl bg-blue-400 text-white shadow-xl sm:min-h-[360px] lg:min-h-[420px]"
      style={{
        backgroundImage: `url(${DropoffBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}")`,
          backgroundRepeat: "repeat",
            opacity: 0.08,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/70 via-cyan-700/60 to-teal-400/40 dark:from-slate-950/80 dark:via-cyan-900/70 dark:to-teal-500/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center">
        <img
          src={carImage}
          alt="Affordable rental car"
          className="w-[75%] max-w-[420px] min-w-[220px] select-none object-contain drop-shadow-2xl sm:w-[65%]"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col gap-4 p-6 pb-20 sm:p-8 sm:pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          Easy Rental
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
            Easy way to rent a car at a low price
          </h2>
          <p className="max-w-md text-sm text-white/80 sm:text-base">
            Providing cheap car rental services with a safe and comfortable experience.
          </p>
        </div>
      </div>
    </div>
  );
}

