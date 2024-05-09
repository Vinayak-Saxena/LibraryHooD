import { createContext, useReducer } from 'react'

export const DBooksContext = createContext()

export const dbooksReducer = (state, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case 'SET_BOOKS':
      return { 
        dbooks: action.payload 
      }
    case 'CREATE_BOOK':
      return { 
        dbooks: [action.payload, ...state.dbooks] 
      }
    case 'DELETE_BOOK':
      return { 
        dbooks: state.dbooks.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const DBooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dbooksReducer, { 
    books: [] 
  });
  
  return (
    <DBooksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </DBooksContext.Provider>
  )
}