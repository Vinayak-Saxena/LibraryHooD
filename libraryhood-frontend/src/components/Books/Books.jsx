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
} from "@material-ui/core";
import "./Books.css";

export default function Books() {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemove = async (bookId) => {
    const confirmation = window.confirm('Are you sure you want to remove this book?');
    if (!confirmation) return;
  
    try {
      const response = await fetch(`http://localhost:4000/api/book/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        // Update state to reflect the removal
        setBooks(books.filter(book => book._id !== bookId));
      } else {
        console.log('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/book/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setBooks(json);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      }
    };

    fetchBooks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter books based on the search term
  const filteredBooks = books && books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}        
        onChange={handleSearchChange}
        className="search-field"
      />
      <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <Table border="2" style={{ width: '90%', justifyContent: 'center', background: 'white' }} size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Author</b></TableCell>
              <TableCell><b>Genre</b></TableCell>
              <TableCell><b>Available</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks && filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
              <TableRow key={book._id}>
                <TableCell><img src={book.image} alt="No Preview" width={100} /></TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.available}</TableCell>
                <TableCell>
                  <button className="removeButton" type="button" onClick={() => handleRemove(book._id)}>Remove Book</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={filteredBooks ? filteredBooks.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
