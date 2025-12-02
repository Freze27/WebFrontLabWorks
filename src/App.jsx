import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CarDetails from "./pages/CarDetails/CarDetails";
import Profile from "./pages/Profile/Profile";
import Category from "./pages/Category/Category";
import SearchFilter from "./pages/SearchFilter/SearchFilter";
import Error from "./pages/Error/Error";
import Rent from "./pages/Rent/Rent";
import AuthModal from "./components/AuthModal/AuthModal";

function App() {
  return (
    <>
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/car-details" element={<CarDetails />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/category" element={<Category />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
