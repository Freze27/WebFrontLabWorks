import { createContext, useState } from "react";

const Context = createContext({});

export function DropDownContext({ children }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);
  const [openMenu4, setOpenMenu4] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu((prevValue) => !prevValue);
  };

  const handleOpenMenu2 = () => {
    setOpenMenu2((prevValue) => !prevValue);
  };

  const handleOpenMenu3 = () => {
    setOpenMenu3((prevValue) => !prevValue);
  };

  const handleOpenMenu4 = () => {
    setOpenMenu4((prevValue) => !prevValue);
  };

  const defaultContextObject = {
    openMenu,
    openMenu2,
    openMenu3,
    openMenu4,
    handleOpenMenu,
    handleOpenMenu2,
    handleOpenMenu3,
    handleOpenMenu4,
  };

  return (
    <Context.Provider value={defaultContextObject}>
      {children}
    </Context.Provider>
  );
}

export function useDropDownContext() {
  return useContext(Context);
}

