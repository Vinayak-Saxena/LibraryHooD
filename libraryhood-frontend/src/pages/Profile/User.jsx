import React, { useState, useEffect } from "react";
import "./User.css";

import UserBook from "../../components/Books/UserBook";
import { useBooksContext } from "../../hooks/useBookContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import BookSearch from "../../components/Books/BookSearch";
import ReadingBooks from "../../components/Books/ReadingBooks";

export default function User() {
  const { dispatch } = useBooksContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState("");
  const [filteredAllBooks, setFilteredAllBooks] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [student_roll, setMyReadingTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState("");
  const [error, setError] = useState(null);
  const [showProfile, setShowProfile] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showFine, setShowFine] = useState(false);
  const [dtitle, setDTitle] = useState("");
  const [dauthor, setDAuthor] = useState("");
  const [dgenre, setDGenre] = useState("");
  const [dimage, setDImage] = useState("");
  const { user } = useAuthContext();
  const [book_id, setBooKId] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  const toggleProfile = () => {
    setShowProfile(true);
    setShowSearch(false);
    setShowIssue(false);
    setShowReturn(false);
    setShowDonate(false);
    setShowFine(false);
    setFilteredRecords(null);
  };

  const toggleSearch = () => {
    setShowProfile(false);
    setShowSearch(true);
    setShowIssue(false);
    setShowReturn(false);
    setShowDonate(false);
    setShowFine(false);
    setFilteredBooks(null);
    setFilteredAllBooks(null);
    setError(null);
  };

  const toggleIssue = () => {
    setShowProfile(false);
    setShowSearch(false);
    setShowIssue(true);
    setShowReturn(false);
    setShowDonate(false);
    setShowFine(false);
  };

  const toggleReturn = () => {
    setShowProfile(false);
    setShowSearch(false);
    setShowIssue(false);
    setShowReturn(true);
    setShowDonate(false);
    setShowFine(false);
  };
  const toggleDonate = () => {
    setShowProfile(false);
    setShowSearch(false);
    setShowIssue(false);
    setShowReturn(false);
    setShowDonate(true);
    setShowFine(false);
  };
  const toggleFine = () => {
    setShowProfile(false);
    setShowSearch(false);
    setShowIssue(false);
    setShowReturn(false);
    setShowDonate(false);
    setShowFine(true);
  };



  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    const newDBook = {
      title: dtitle,
      author: dauthor,
      genre: dgenre,
      image: dimage,
    };
    const response = await fetch("http://localhost:4000/api/donation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDBook),
    });
    try {
      const json = await response.json();
      console.log("JSON Response:", json);

      if (!response.ok) {
        console.log({ mssg: "Error" });
      }
      if (response.ok) {
        dispatch({ type: "CREATE_BOOK", payload: json });
        alert("Success");
        setDTitle("");
        setDAuthor("");
        setDGenre("");
        setDImage("");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <div className="user-container">
      <div className="user-image">
        <button onClick={toggleProfile}>My Profile</button>
        <br />
        <button onClick={toggleSearch}>Search Book</button>
        <br />
        <button onClick={toggleIssue}>Issue & Return Book</button>
        <br />

        <button onClick={toggleDonate}>Donate Book</button>
        <br />
        {/* <button onClick={toggleFine}>Pay Fine</button> */}
        <br />
      </div>
      <div className="user-features">
        {showProfile && (
          <div>
            <h2>My Profile</h2>
            <div className="profile-container">
              <div>
                <h3>View Your Readings</h3>
                <ReadingBooks/>
                
                
              </div>
            </div>
          </div>
        )}   


        {showSearch && (
          <div>
            {" "}
            <UserBook />{" "}
          </div>
        )}

        {showIssue && (
          <div className="userIssue-container">
            <div className="formIssue-container">
              <div className="header">Issue & Return Book Form</div>
              <center>
                <BookSearch />
              </center>
            </div>
          </div>
        )}

        {showDonate && (
          <div className="userDonate-container">
            <div className="formDonate-container">
              <div className="header">Donate Book Form</div>
              <center>
                <form onSubmit={handleDonateSubmit}>
                  <input
                    type="text"
                    placeholder="Book Name"
                    className="input-field"
                    onChange={(e) => setDTitle(e.target.value)}
                    value={dtitle}
                  />{" "}
                  <br />
                  <input  type="text" placeholder="Author"
                    className="input-field"
                    onChange={(e) => setDAuthor(e.target.value)}
                    value={dauthor}
                  />{" "}
                  <br />
                  <input
                    type="text" placeholder="Genre"
                    className="input-field"
                    onChange={(e) => setDGenre(e.target.value)}
                    value={dgenre}
                  />{" "}
                  <br />
                  <input
                    type="text" className="input-field"
                    placeholder="Enter the link of image"
                    onChange={(e) => setDImage(e.target.value)}
                    value={dimage}
                  />{" "}
                  <br />
                  <button type="submit" className="submit-btn">
                    Donate
                  </button>
                </form>
              </center>
            </div>
          </div>
        )}

        {showFine && (
          <div className="userIssue-container">
            <div className="formIssue-container">
              <div className="header">Pay Fine</div>
              <center>
                <form>
                  <input
                    type="text"
                    placeholder="Enter Your Roll Number"
                    className="input-field"
                  />
                  <h3>Your Total Fine is :</h3>
                  <button
                    type="submit"
                    className="submit-btn"
                    style={{
                      backgroundColor: "#27ae60",
                    }}
                  >
                    Pay Fine
                  </button>
                </form>
              </center>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
