import { useState } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import { authApi } from "../../api/api";

export default function AuthModal() {
  const { isOpen, toggleModal } = useModalContext();
  const [mode, setMode] = useState("login");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSignup = async () => {
    setError(null);
    try {
      await authApi.register({ firstName, lastName, email, password });
      window.location.reload();
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  const handleLogin = async () => {
    setError(null);
    try {
      await authApi.login(email, password);
      window.location.reload();
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onMouseDown={(e) => e.target === e.currentTarget && toggleModal()}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white-0 p-6 shadow-2xl dark:bg-gray-900"
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-6 flex rounded-xl bg-gray-100 p-1 text-sm font-semibold dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg px-3 py-2 transition-colors ${
              mode === "signup"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-lg px-3 py-2 transition-colors ${
              mode === "login"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            Login
          </button>
        </div>

        {mode === "signup" ? (
          <>
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Sign up to manage your rentals.
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Log in with your email and password.
            </p>
          </>
        )}

        <div className="space-y-4">
          {mode === "signup" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Last name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Doe"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Create a password"
                />
              </div>
            </div>
          )}

          {mode === "login" && (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white-0 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Your password"
                />
              </div>
            </div>
          )}

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="button"
            onClick={mode === "signup" ? handleSignup : handleLogin}
            className="btn-primary w-full justify-center"
          >
            {mode === "signup" ? "Create account" : "Log in"}
          </button>

          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Demo account: <span className="font-mono">demo@demo.com / demo1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}


