import { useContext } from "react";
import { CarsContext } from "../../contexts/CarsContext";
import CarSection from "./CarSection";

export default function RecomendationCar() {
  const { cars } = useContext(CarsContext);
  return <CarSection title="Recommendation Car" cars={cars?.slice(4, 8) ?? []} />;
}
