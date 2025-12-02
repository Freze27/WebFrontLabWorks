import { createContext, useReducer, useContext } from "react";

const ActionTypes = {
  location1: "LOCATION_ONE",
  location2: "LOCATION_TWO",
  date1: "DATE_ONE",
  date2: "DATE_TWO",
  time1: "TIME_ONE",
  time2: "TIME_TWO",
};

const initialState = {
  location1: "",
  location2: "",
  date1: "",
  date2: "",
  time1: "",
  time2: "",
};

const PickUpDropOffReducer = (state, action) => {
  switch (action.type) {
    case "LOCATION_ONE":
      return { ...state, location1: action.payload };
    case "LOCATION_TWO":
      return { ...state, location2: action.payload };
    case "DATE_ONE":
      return { ...state, date1: action.payload };
    case "DATE_TWO":
      return { ...state, date2: action.payload };
    case "TIME_ONE":
      return { ...state, time1: action.payload };
    case "TIME_TWO":
      return { ...state, time2: action.payload };
    default:
      return state;
  }
};

const Context = createContext({});

export function PickUpDropOffContext({ children }) {
  const [state, dispatch] = useReducer(PickUpDropOffReducer, initialState);

  const locationOneChange = (payload) =>
    dispatch({ type: ActionTypes.location1, payload: payload });
  const locationTwoChange = (payload) =>
    dispatch({ type: ActionTypes.location2, payload: payload });
  const dateOneChange = (payload) =>
    dispatch({ type: ActionTypes.date1, payload: payload });
  const dateTwoChange = (payload) =>
    dispatch({ type: ActionTypes.date2, payload: payload });
  const timeOneChange = (payload) =>
    dispatch({ type: ActionTypes.time1, payload: payload });
  const timeTwoChange = (payload) =>
    dispatch({ type: ActionTypes.time2, payload: payload });

  const defaultContextObject = {
    locationOneChange,
    locationTwoChange,
    dateOneChange,
    dateTwoChange,
    timeOneChange,
    timeTwoChange,
    state,
  };

  return (
    <Context.Provider value={defaultContextObject}>
      {children}
    </Context.Provider>
  );
}

export function usePickUpDropOffContext() {
  return useContext(Context);
}

