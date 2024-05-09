import React, { useState, useEffect } from "react";
import {  TableContainer,  TableHead,  TableBody,  TableCell,  TableRow,  Table,} 
from "@material-ui/core";
export default function DonateBooks() {
  const [dbooks, setDBooks] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDBooks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/donation/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setDBooks(json);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      }
    };
    fetchDBooks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log('Donated Books:', dbooks);
  return (
    <TableContainer style={{ display: "flex", justifyContent: "center" }}>
      <Table
        border="2"
        style={{ width: "90%", justifyContent: "center", background: "white" }}
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell><b>Title</b></TableCell> <TableCell><b>Author</b></TableCell>
            <TableCell><b>Genre</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dbooks && dbooks.map((dbook) => (
            <TableRow key={dbook?._id}>
              <TableCell>{dbook?.title}</TableCell>
              <TableCell>{dbook?.author}</TableCell>
              <TableCell>{dbook?.genre}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
