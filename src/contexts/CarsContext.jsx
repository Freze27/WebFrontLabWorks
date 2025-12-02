import { createContext, useReducer, useEffect } from "react";
import { carApi } from "../api/mockApi";

export const ActionKind = {
  GetAllCars: "GET_ALL_CARS",
  GetOneCar: "GET_One_CAR",
  AddToCart: "ADD_TO_CART",
  Create_Car: "CREATE_CAR",
  Delete_Car: "DELETE_CAR",
  Add_to_Query: "ADD_TO_QUERY",
  Add_To_Search: "ADD_TO_SEARCH",
  Filter_Type_Query: "FILTER__TYPE_QUERY",
  Filter_Price_Min_Query: "FILTER__PRICE_MIN_QUERY",
  Filter_Price_Max_Query: "FILTER__PRICE_MAX_QUERY",
  Filter_HP_Min_Query: "FILTER__HP_MIN_QUERY",
  Filter_HP_Max_Query: "FILTER__HP_MAX_QUERY",
};

const initialState = {
  cars: [],
  searchItems: [],
  filterItems: [],
  query: "",
  filterType: [],
  filterPriceMin: 0,
  filterPriceMax: 200,
  filterHpMin: 0,
  filterHpMax: 1000,
};

function carsReducer(state, action) {
  switch (action.type) {
    case ActionKind.GetAllCars:
      return { ...state, cars: action.payload };
    case ActionKind.Create_Car:
      return { ...state, cars: action.payload };
    case ActionKind.Delete_Car:
      return { ...state, cars: action.payload };
    case ActionKind.Add_To_Search:
      return { ...state, searchItems: action.payload };
    case ActionKind.Add_to_Query:
      return { ...state, query: action.payload };
    case ActionKind.Filter_Type_Query:
      return { ...state, filterType: action.payload };
    case ActionKind.Filter_Price_Min_Query:
      return { ...state, filterPriceMin: action.payload };
    case ActionKind.Filter_Price_Max_Query:
      return { ...state, filterPriceMax: action.payload };
    case ActionKind.Filter_HP_Min_Query:
      return { ...state, filterHpMin: action.payload };
    case ActionKind.Filter_HP_Max_Query:
      return { ...state, filterHpMax: action.payload };
    default:
      return state;
  }
}

const CarsContext = createContext({});

export function CarsContextProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carApi.getAllCars();
        if (data && data.car) {
          dispatch({ type: ActionKind.GetAllCars, payload: data.car });
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const createCar = async (car, e) => {
    e.preventDefault();
    try {
      const response = await carApi.createCar(car);
      if (response && response.car) {
        const updateCars = [...state.cars, response.car];
        dispatch({ type: ActionKind.Create_Car, payload: updateCars });
      }
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const deleteCar = async (id) => {
    try {
      const response = await carApi.deleteCar(id);
      if (response) {
        const updatedCars = state.cars.filter((car) => id !== car._id);
        dispatch({ type: ActionKind.Delete_Car, payload: updatedCars });
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const addToQuery = (query) => {
    dispatch({ type: ActionKind.Add_to_Query, payload: query });
  };

  const addToSearch = (searchCarList) => {
    dispatch({ type: ActionKind.Add_To_Search, payload: searchCarList });
  };

  return (
    <CarsContext.Provider
      value={{
        ...state,
        createCar,
        deleteCar,
        addToQuery,
        addToSearch,
        dispatch,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

export { CarsContext };

