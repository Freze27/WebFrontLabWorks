import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { ModalContext } from "./contexts/ModalContext";
import { PickUpDropOffContext } from "./contexts/PickUpDropOffContext";
import { DropDownContext } from "./contexts/DropDownContext";
import { UserContextProvider } from "./contexts/UserContext";
import { CarsContextProvider } from "./contexts/CarsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalContext>
      <PickUpDropOffContext>
        <DropDownContext>
          <UserContextProvider>
            <CarsContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CarsContextProvider>
          </UserContextProvider>
        </DropDownContext>
      </PickUpDropOffContext>
    </ModalContext>
  </StrictMode>
);
