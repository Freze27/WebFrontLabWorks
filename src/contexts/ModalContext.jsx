import { createContext, useState, useContext } from "react";

const Context = createContext({});

export function ModalContext({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevVal) => !prevVal);
  };

  const defaultContextObject = {
    isOpen,
    setIsOpen,
    toggleModal,
  };

  return (
    <Context.Provider value={defaultContextObject}>
      {children}
    </Context.Provider>
  );
}

export function useModalContext() {
  return useContext(Context);
}

