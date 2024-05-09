import { createContext, useReducer } from "react";

export const RecordsContext = createContext();

export const RECORDsReducer = (state, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case "SET_RECORDS":
      return {
        records: action.payload,
      };
    case "CREATE_RECORD":
      return {
        records: [action.payload, ...state.records],
      };
    case "DELETE_RECORD":
      return {
        records: state.records.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_RECORD":
      return {
        records: state.records.map((record) => {
          if (record._id === action.payload._id) {
            // Update the record details with the payload
            return {
              ...record,
              ...action.payload.updatedDetails,
            };
          }
          return record;
        }),
      };
    default:
      return state;
  }
};

export const RecordsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RECORDsReducer, {
    records: [],
  });

  return (
    <RECORDsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RECORDsContext.Provider>
  );
};
