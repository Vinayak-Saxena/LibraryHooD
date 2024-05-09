import React, { useState, useEffect } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Table,
  } from "@material-ui/core";

export default function IssuedBooks() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/records/');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const json = await response.json();
          setDetails(json);
        } catch (error) {
          setError(error.message || 'Something went wrong');
        }
      };
  
      fetchDetails();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    console.log('Details', details);



  return (
    <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
      <Table border="2" style={{ width: '60%', justifyContent: 'center', background: 'white' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Book Name</b></TableCell>
            <TableCell><b>Issued Date</b></TableCell>
            <TableCell><b>Returning Date</b></TableCell>
            <TableCell><b>BookID</b></TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {details && details.map((detail) => (
            <TableRow key={detail?._id}>
              <TableCell>{detail?.title}</TableCell>
              <TableCell>{detail?.createdAt}</TableCell>
              <TableCell>{detail?.createdAt}</TableCell>
              <TableCell>{detail?._id.substring(0 ,3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  )
}

