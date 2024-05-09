import React, { useState, useEffect } from "react";
import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TablePagination,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBooksContext } from "../../hooks/useBookContext";
import "./Books.css";

export default function BookSearch() {
  const { user } = useAuthContext();
  const { dispatch } = useBooksContext();

  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadings, setImageLoadings] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/book/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setBooks(json);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/records/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch issued books");
        }
        const json = await response.json();
        setIssuedBooks(json);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
    };

    fetchIssuedBooks();
  }, [user.id]);

  const handleIssueBook = async (bookId, bookTitle) => {
    const currentDate = new Date();
    const newRecord = {
      student_id: user.id,
      book_id: bookId,
      issued_date: currentDate,
    };

    try {
      const recordResponse = await fetch("http://localhost:4000/api/records/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      if (!recordResponse.ok) {
        throw new Error("Failed to create record");
      }

      const recordJson = await recordResponse.json();
      console.log("Record JSON Response:", recordJson);

      // Decrement available books count
      const bookResponse = await fetch(
        `http://localhost:4000/api/book/${bookTitle}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updateType: "decrement" }),
        }
      );

      if (!bookResponse.ok) {
        throw new Error("Failed to update book details");
      }

      const bookJson = await bookResponse.json();
      console.log("Book JSON Response:", bookJson);

      // Dispatch actions if needed
      dispatch({ type: "CREATE_RECORD", payload: recordJson });
      dispatch({ type: "UPDATE_RECORD", payload: bookJson.available });

      // Fetch updated issued books
      const updatedIssuedBooksResponse = await fetch(
        `http://localhost:4000/api/records/${user.id}`
      );
      if (!updatedIssuedBooksResponse.ok) {
        throw new Error("Failed to fetch updated issued books");
      }
      const updatedIssuedBooksJson = await updatedIssuedBooksResponse.json();
      setIssuedBooks(updatedIssuedBooksJson);
    } catch (error) {
      console.error("Error handling book issue:", error);
      alert("Failed to issue the book. Please try again later.");
    }
  };

  const handleReturnBook = async (bookId, title) => {
    const currentDate = new Date();
    const newRecord = { returned_date: currentDate };

    try {
        // Find the correct record to update based on certain conditions
        const recordsToUpdate = issuedBooks.filter(
            book =>
                book.book_id._id === bookId &&
                book.book_id.title === title &&
                book.returned_date === null
        );

        if (recordsToUpdate.length === 0) {
            throw new Error("Record not found or already returned");
        }

        const recordToUpdate = recordsToUpdate[0];

        const recordResponse = await fetch(
            `http://localhost:4000/api/records/${recordToUpdate._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecord),
            }
        );

        if (!recordResponse.ok) {
            throw new Error("Failed to update record");
        }

        // Update issuedBooks state to remove the returned book
        setIssuedBooks(prevIssuedBooks =>
            prevIssuedBooks.map(book =>
                book._id === recordToUpdate._id
                    ? { ...book, returned_date: currentDate }
                    : book
            )
        );

        const recordJson = await recordResponse.json();
        console.log("Record JSON Response:", recordJson);

        // Increment available books count
        const bookResponse = await fetch(
            `http://localhost:4000/api/book/${title}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ updateType: "increment" }),
            }
        );

        if (!bookResponse.ok) {
            throw new Error("Failed to update book details");
        }

        const bookJson = await bookResponse.json();
        console.log("Book JSON Response:", bookJson);

        // Dispatch actions if needed
        dispatch({ type: "UPDATE_RECORD", payload: recordJson });
        dispatch({ type: "UPDATE_RECORD", payload: bookJson.available });
    } catch (error) {
        console.error("Error handling book return:", error);
        alert("Failed to return the book. Please try again later.");
    }
};







  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleImageLoaded = (bookId) => {
    setImageLoadings((prevState) => ({
      ...prevState,
      [bookId]: false,
    }));
  };

  const handleImageError = (bookId) => {
    setImageLoadings((prevState) => ({
      ...prevState,
      [bookId]: false,
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  let filteredBooks = searchTerm
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-field"
      />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        searchTerm && (
          <>
            <TableContainer
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Table
                border="2"
                style={{
                  width: "80%",
                  justifyContent: "center",
                  background: "white",
                }}
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Image</b>
                    </TableCell>
                    <TableCell>
                      <b>Title</b>
                    </TableCell>
                    <TableCell>
                      <b>Author</b>
                    </TableCell>
                    <TableCell>
                      <b>Genre</b>
                    </TableCell>
                    <TableCell>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((book) => {
                      const isBookIssued = issuedBooks.some(
                        (b) =>
                          b.book_id._id === book._id &&
                          b.student_id._id === user.id &&
                          !b.returned_date
                      );

                      return (
                        <TableRow key={book._id}>
                          <TableCell>
                            {imageLoadings[book._id] ? (
                              <CircularProgress size={24} />
                            ) : (
                              <img
                                src={book.image}
                                alt="No Preview"
                                width={100}
                                onLoad={() => handleImageLoaded(book._id)}
                                onError={() => handleImageError(book._id)}
                              />
                            )}
                          </TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.genre}</TableCell>
                          <TableCell>
                            {isBookIssued ? (
                              <button
                                className="returnButton"
                                type="button"
                                onClick={() =>
                                  handleReturnBook(book._id, book.title)
                                }
                              >
                                Return
                              </button>
                            ) : issuedBooks.filter((b) => !b.returned_date).length >= 2 ? (
                              <span>Already issued 2 books</span>
                            ) : (
                              <button
                                className="issueButton"
                                type="button"
                                onClick={() =>
                                  handleIssueBook(book._id, book.title)
                                }
                              >
                                Issue
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3]}
              component="div"
              count={filteredBooks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )
      )}
    </div>
  );
}
