import { createContext, useEffect, useState } from "react";
import { userApi } from "../api/mockApi";

const UserContextObj = createContext({});

export function UserContextProvider({ children }) {
  const [userObject, setUserObject] = useState({});

  const fetchUserData = async () => {
    try {
      const user = await userApi.getCurrentUser();
      if (user) {
        setUserObject(user);
      } else {
        setUserObject({});
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserObject({});
    }
  };

  useEffect(() => {
    fetchUserData();
    
    const handleStorageChange = () => {
      fetchUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', fetchUserData);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', fetchUserData);
    };
  }, []);

  return (
    <UserContextObj.Provider value={{ ...userObject, refreshUser: fetchUserData }}>
      {children}
    </UserContextObj.Provider>
  );
}

export { UserContextObj };

