import React, { useState, useEffect } from "react";
import {  Table,  TableContainer,  TableHead,  TableCell,  TableRow,  TableBody,}
 from "@material-ui/core";
export default function StudentIssueReturnRecord() {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/records/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setDetails(json);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
    };
    fetchDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("Details", details);
  return (
    <TableContainer style={{ display: "flex", justifyContent: "center" }}>
      <Table
        border="2"
        style={{ width: "90%", justifyContent: "center", background: "white" }}
        size="small">
        <TableHead>
          <TableRow>
            <TableCell>          <b>Student Email</b>        </TableCell>
            <TableCell>          <b>Book Issued</b>          </TableCell>
            <TableCell>          <b>Date Issued</b>          </TableCell>
            <TableCell>          <b>Date Return</b>          </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {details &&
            details.map((detail) => (
              <TableRow key={detail?._id}>
                <TableCell>{detail?.student_id?.email}</TableCell>                
                <TableCell>{detail?.book_id?.title}</TableCell>
                <TableCell>  {new Date(detail?.issued_date).toLocaleDateString()}  </TableCell>
                <TableCell> {detail?.returned_date
                    ? new Date(detail?.returned_date).toLocaleDateString()
                    : "Not returned yet"}
                </TableCell>                
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
