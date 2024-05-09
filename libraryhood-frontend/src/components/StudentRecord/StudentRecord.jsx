import React, { useEffect, useState } from "react";
import {
  TableContainer,  TableHead,  TableBody,  TableCell,  TableRow,  Table,} from "@material-ui/core";

export default function StudentRecord() {
  const handleStudentRemove = async (id, email) => {
    const confirmation = window.confirm('Are you sure you want to remove this student?');
    if (!confirmation) return;

    // Check if the email is 'admin@gmail.com'
    if (email === 'admin@gmail.com') {
      alert('Access denied. You cannot remove the admin user.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStudents(students.filter(student => student._id !== id));
      } else {
        console.log('Failed to remove student');
      }
    } catch (error) {
      console.error('Error removing student:', error);
    }
  };

  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setStudents(json);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <TableContainer style={{ display: "flex", justifyContent: "center" }}>
      <Table
        border="2"
        style={{ width: "90%", justifyContent: "center", background: "white" }}
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Student Name</b></TableCell>
            <TableCell align="center"><b>Student Email</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students && students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>                
                <button className="removeButton" type="button" onClick={() => handleStudentRemove(student._id, student.email)}>Remove User</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
