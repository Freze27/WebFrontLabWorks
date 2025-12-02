import { useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserContextObj } from "../../contexts/UserContext";
import navAvatar from "../../assets/img/nav-avatar.png";

export default function Profile() {
  const userObject = useContext(UserContextObj);
  const rentals = userObject?.rentals || [];

  if (!userObject?._id) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
          <div className="padding-layout py-8 max-w-4xl mx-auto">
            <h1 className="h1-bold text-gray-900 dark:text-white mb-8">Profile</h1>
            <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-8 shadow-md">
              <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white-200 dark:bg-gray-900">
      <Header />
      <div className="padding-layout py-8 max-w-4xl mx-auto space-y-8">
        <h1 className="h1-bold text-gray-900 dark:text-white">Profile</h1>

        <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-8 shadow-md">
          <img
            src={navAvatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          <div className="mt-4 space-y-4">
            <div>
              <div className="text-sm text-gray-400 dark:text-gray-400 mb-1">Display Name</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {userObject.displayName}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 dark:text-gray-400 mb-1">First Name</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {userObject.firstName}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 dark:text-gray-400 mb-1">Last Name</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {userObject.lastName}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white-0 dark:bg-gray-800 rounded-[10px] p-8 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Rental History
          </h2>

          {rentals.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              You have no rentals yet.
            </p>
          ) : (
            <div className="space-y-3">
              {rentals.map((rental) => (
                <div
                  key={rental.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 gap-2"
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {rental.carTitle}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-blue-500 md:text-right">
                    {rental.totalAmount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
