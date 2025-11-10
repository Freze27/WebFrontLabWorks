import { useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import CurrentLocationIcon from "../../assets/current location icon.svg";

export default function CurrentLocationButton({ onSelectCity }) {
  const [loading, setLoading] = useState(false);
  const { lang } = useI18n();

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === "ru" ? "Геолокация не поддерживается вашим браузером" : "Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_OWM_API_KEY;
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            const location = data[0];
            onSelectCity({
              name: location.name,
              country: location.country,
              state: location.state,
              lat: latitude,
              lon: longitude,
            });
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert(lang === "ru" ? "Ошибка при получении местоположения" : "Error fetching location");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(lang === "ru" ? "Не удалось получить местоположение" : "Failed to get location");
        setLoading(false);
      }
    );
  };

  const texts = {
    en: {
      label: "Current Location",
    },
    ru: {
      label: "Текущее местоположение",
    },
  };

  const t = texts[lang] || texts.en;

  return (
    <button
      onClick={handleGetLocation}
      disabled={loading}
      className="flex-1 relative items-center w-full max-w-[300px]"
    >
      <img
        src={CurrentLocationIcon}
        alt="Current location icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[40px] h-[46px] pointer-events-none"
      />
      <p
        className="
                    rounded-[40px]
                    px-[33px] py-[15px] pl-[70px]
                    font-poppins text-1.1 font-extrabold
                    bg-[#4CBB17]
                    text-black
                    text-center
                    transition-opacity duration-300
                    disabled:opacity-50
                "
      >
        {loading ? (lang === "ru" ? "Загрузка..." : "Loading...") : t.label}
      </p>
    </button>
  );
}

