import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BooksContextProvider } from "./context/BookContext.jsx";
import { StudentsContextProvider } from "./context/StudentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StudentsContextProvider>
        <BooksContextProvider>
          <App />
        </BooksContextProvider>
      </StudentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
