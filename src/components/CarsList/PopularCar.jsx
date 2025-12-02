import { useContext } from "react";
import { CarsContext } from "../../contexts/CarsContext";
import CarSection from "./CarSection";

export default function PopularCar() {
  const { cars } = useContext(CarsContext);

  return <CarSection title="Popular Car" cars={cars?.slice(0, 4) ?? []} />;
}
