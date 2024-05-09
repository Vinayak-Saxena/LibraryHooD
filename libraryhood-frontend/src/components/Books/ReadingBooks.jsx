import React, { useState, useEffect } from "react";
import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
  CircularProgress,
} from "@material-ui/core";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function IssuedBooks() {
  const { user } = useAuthContext();

  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/records/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setDetails(json);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
    };

    fetchDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loading && (!details || details.length === 0)) {
    return <div>You have not issued any book. <br /> Please issue a book by clicking on the 'Issue & Return Book'.</div>;
  }

  console.log("Details", details);

  return (
    <TableContainer style={{ display: "flex", justifyContent: "center" }}>
      <Table border="2" style={{ width: "80%", justifyContent: "center", background: "white" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Image</b></TableCell>
            <TableCell><b>Book Name</b></TableCell>
            <TableCell><b>Book Author</b></TableCell>
            <TableCell><b>Book Genre</b></TableCell>
            <TableCell><b>Issued Date</b></TableCell>
            <TableCell><b>Return By</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details &&
            details.map((detail) => (
              <TableRow key={detail?._id}>
                <TableCell>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <img src={detail?.book_id?.image} alt="No Preview" width={90} />
                  )}
                </TableCell>
                <TableCell>{detail?.book_id?.title}</TableCell>
                <TableCell>{detail?.book_id?.author}</TableCell>
                <TableCell>{detail?.book_id?.genre}</TableCell>
                <TableCell>{new Date(detail?.issued_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {new Date(new Date(detail?.issued_date).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
