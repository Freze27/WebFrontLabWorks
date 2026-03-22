import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContextObj } from "../../contexts/UserContext";
import { userApi } from "../../api/api";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import Logo from "../../assets/icon/Logo.png";
import navAvatar from "../../assets/img/nav-avatar.png";
import { useModalContext } from "../../contexts/ModalContext";

export default function Header() {
  const userObject = useContext(UserContextObj);
const { toggleModal } = useModalContext();

  const openAuth = () => {
    toggleModal();
  };

  const logout = async () => {
    await userApi.logout();
    userObject.refreshUser();
  };

  return (
    <nav className="sticky top-0 z-40 flex h-[100px] w-full items-center border-b border-slate-300/40 bg-white-0 dark:border-slate-800 dark:bg-gray-900">
      <div className="padding-layout flex w-full flex-row items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="MORENT Logo" className="h-8 md:h-11" />
        </Link>
        
        <div className="hidden md:flex items-center justify-between gap-x-9 text-base font-medium text-slate-600 dark:text-gray-400">
        </div>

        <div className="flex items-center gap-4">

          {userObject?._id ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <img
                  src={navAvatar}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full object-cover cursor-pointer hover:ring-2 ring-blue-500 transition-all"
                />
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-400 text-white rounded-md font-semibold hover:opacity-80 transition-opacity text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:opacity-80 transition-opacity text-sm"
            >
              Sign In
            </button>
          )}

          <div className="hidden md:block w-px h-9 bg-gray-300 dark:bg-gray-700 mx-2" />
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
}
