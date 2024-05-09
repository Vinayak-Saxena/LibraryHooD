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
import "./Books.css";


export default function UserBook() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/book/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setBooks(json);
        setLoading(false); 
      } catch (error) {
        setError(error.message || 'Something went wrong');
        setLoading(false); 
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
      {loading ? ( // Render loading indicator if loading is true
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
          <Table border="2" style={{ width: '200%', justifyContent: 'center', background: 'white' }} size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Author</b></TableCell>
                <TableCell><b>Genre</b></TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks && filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
                <TableRow key={book._id}>
                  <TableCell><img src={book.image} alt="No Preview" width={90} /></TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!loading && ( 
        <TablePagination
          rowsPerPageOptions={[4]}
          component="div"
          count={filteredBooks ? filteredBooks.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}
