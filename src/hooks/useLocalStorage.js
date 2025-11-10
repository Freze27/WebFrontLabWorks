import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
        }
      }
    };

    const handleLocalStorageChange = (e) => {
      if (e.detail && e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleLocalStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleLocalStorageChange);
    };
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue((prev) => {
        if (prev === valueToStore) {
          return valueToStore;
        }
        return valueToStore;
      });
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key, value: valueToStore } }));
    } catch (error) {
    }
  };

  return [storedValue, setValue];
}
