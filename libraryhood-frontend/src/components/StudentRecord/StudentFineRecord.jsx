import React from "react";
import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
} from "@material-ui/core";

function createData(StudentName , StudentID , TotalFine , FineStatus) {
  return {StudentName , StudentID, TotalFine , FineStatus};
}

const rows = [
  createData("Prithu Singh",1001 ,100 ,"Paid" ),
  createData("Apoorv Misra",1002 , 1000,"Not Paid"),
];

export default function StudentFineRecord() {
  return (
    <TableContainer style={{ display: "flex", justifyContent: "center" }}>
      <Table
        border="2"
        style={{ width: "90%", justifyContent: "center", background: "white" }}
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell><b>Student Name</b></TableCell>
            <TableCell><b>Student ID</b></TableCell>
            <TableCell><b>Total Fine Amount</b></TableCell>
            <TableCell><b>Fine Status</b></TableCell>
            <TableCell><b>Send Remainder</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.StudentID}>
              <TableCell>{row.StudentName}</TableCell>
              <TableCell>{row.StudentID}</TableCell>
              <TableCell>{row.TotalFine}</TableCell>
              <TableCell>{row.FineStatus}</TableCell>
              <TableCell><button className="send-reminder">Send Reminder</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
