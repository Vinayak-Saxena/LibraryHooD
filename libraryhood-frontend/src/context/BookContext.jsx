import { createContext, useReducer } from "react";

export const BooksContext = createContext();

export const booksReducer = (state, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case "SET_BOOKS":
      return {
        books: action.payload,
      };
    case "CREATE_BOOK":
      return {
        books: [action.payload, ...state.books],
      };
    case "DELETE_BOOK":
      return {
        books: state.books.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_BOOK":
      return {
        books: state.books.map((book) => {
          if (book._id === action.payload._id) {
            // Update the book details with the payload
            return {
              ...book,
              ...action.payload.updatedDetails,
            };
          }
          return book;
        }),
      };
    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: [],
  });

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};
