import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Error() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white-200 dark:bg-gray-900 py-8">
        <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-lg text-gray-400 dark:text-gray-400 mb-8">Page not found</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
