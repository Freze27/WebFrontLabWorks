import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserContextObj } from "../../contexts/UserContext";
import { carApi } from "../../api/api";

export default function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const userObject = useContext(UserContextObj);
  const isAdmin = userObject?.role === "ADMIN";

  const [car, setCar] = useState(location.state?.car);
  const galleryImages =
    car?.gallery_images?.length > 0 ? car.gallery_images : car?.file_path ? [car.file_path] : [];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const images =
      car?.gallery_images?.length > 0 ? car.gallery_images : car?.file_path ? [car.file_path] : [];
    setActiveImage(images[0]);
  }, [car]);

  const handleRentNowClick = () => {
    if (!car) return;
    navigate("/rent", { state: { car } });
  };

  const handleEditOpen = () => {
    setEditForm({
      title: car.car_title,
      brand: car.car_brand,
      dailyRate: car.daily_rate,
      seatCapacity: car.seat_capacity,
      horsePower: car.horse_power,
      maxGasoline: car.maximum_gasoline,
      transmissionType: car.transmission_type,
    });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const res = await carApi.updateCar(car._id, {
        title: editForm.title,
        brand: editForm.brand,
        dailyRate: Number(editForm.dailyRate),
        seatCapacity: Number(editForm.seatCapacity),
        horsePower: Number(editForm.horsePower),
        maxGasoline: Number(editForm.maxGasoline),
        transmissionType: editForm.transmissionType,
      });
      setCar(res.car);
      setShowEditModal(false);
    } catch (err) {
      alert(err?.response?.data?.message ?? "Failed to update car");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${car.car_title}"?`)) return;
    setDeleting(true);
    try {
      await carApi.deleteCar(car._id);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message ?? "Failed to delete car");
      setDeleting(false);
    }
  };

  if (!car) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
          <div className="padding-layout py-8">
            <h1 className="h1-bold text-gray-900 dark:text-white mb-4">Car not found</h1>
            <Link to="/" className="text-blue-500 hover:underline">Go back to home</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8">
        <h1 className="h1-bold text-gray-900 dark:text-white mb-4">
          {car.car_title} - {car.car_brand}
        </h1>

        <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-4 shadow-lg mb-4">
          <img src={activeImage} alt={car.car_title} className="w-full max-w-4xl h-auto rounded-[10px] object-cover" />
        </div>

        {galleryImages.length > 1 && (
          <div className="flex flex-wrap gap-4 mb-8">
            {galleryImages.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`rounded-lg border-2 p-1 transition-colors ${
                  image === activeImage
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    : "border-transparent hover:border-blue-300"
                }`}
              >
                <img src={image} alt={`${car.car_title} view`} className="h-20 w-32 object-cover rounded-md" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            ["Body Type", car.car_body_type],
            ["Seat Capacity", `${car.seat_capacity} People`],
            ["Fuel", car.maximum_gasoline === 0 ? "Electric" : `${car.maximum_gasoline}L`],
            ["Transmission", car.transmission_type],
            ["Horse Power", car.horse_power ? `${car.horse_power} HP` : "N/A"],
            ["Daily Rate", `$${car.daily_rate}/day`],
          ].map(([label, value]) => (
            <div key={label} className="p-4 bg-white-0 dark:bg-gray-800 rounded-[10px]">
              <div className="text-sm text-gray-400 mb-2">{label}</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={handleRentNowClick} className="btn-rent inline-block">
            Rent Now
          </button>
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={handleEditOpen}
                className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Car</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Title", "title", "text"],
                ["Brand", "brand", "text"],
                ["Daily Rate ($)", "dailyRate", "number"],
                ["Seat Capacity", "seatCapacity", "number"],
                ["Horse Power", "horsePower", "number"],
                ["Max Gasoline (L)", "maxGasoline", "number"],
                ["Transmission", "transmissionType", "text"],
              ].map(([label, key, type]) => (
                <div key={key} className={key === "title" || key === "transmissionType" ? "col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input
                    type={type}
                    value={editForm[key] ?? ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
