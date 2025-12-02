import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import FeaturedCards from "../../components/FeaturedCards/FeaturedCards";
import Footer from "../../components/Footer/Footer";
import PopularCar from "../../components/CarsList/PopularCar";
import RecomendationCar from "../../components/CarsList/RecomendationCar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <FeaturedCards />
      <PopularCar />
      <RecomendationCar />
      <div className="flex justify-center py-8">
        <Link to="/category" className="btn-show-more">
          Show more cars
        </Link>
      </div>
      <Footer />
    </div>
  );
}
