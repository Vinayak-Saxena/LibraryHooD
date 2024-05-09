import React, {useState} from "react";
import "./Admin.css"
import Books from "../../components/Books/Books";
import StudentRecord from "../../components/StudentRecord/StudentRecord";
import StudentIssueReturnRecord from "../../components/StudentRecord/StudentIssueReturnRecord";
import StudentFineRecord from "../../components/StudentRecord/StudentFineRecord";
import DonateBooks from "../../components/Books/DonateBooks";
import { useBooksContext } from '../../hooks/useBookContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useRecordsContext } from "../../hooks/useRecordContext";


export default function AdminProfile() {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookId, setBookId] = useState('');
  const [available , setBookAvailable] = useState('');
  const [image , setImage] = useState('');
  const [name , setName] = useState('');
  const [roll_no , setRoll] = useState('');
  const [dtitle , setDTitle] = useState('');
  const [dauthor,setDAuthor] = useState('');
  const [dgenre, setDGenre] = useState('');
  const [dimage , setDImage] = useState('');
  const [book_id ,setBooKId] = useState('');
  const [student_id, setStudentID] = useState('');
  const [date , setDate] = useState('');
  
  // const [error, setError] = useState(null)

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const newBook = {title, author, genre , available ,image }; 
    const response = await fetch('http://localhost:4000/api/book/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    });
    try {
      const json = await response.json();
      console.log('JSON Response:', json);
  
      if (!response.ok) {
        console.log({ mssg: 'Error' });
      }
      if (response.ok) {
        dispatch({ type: 'CREATE_BOOK', payload: json });
        setTitle('');
        setAuthor('');
        setGenre('');
        setBookAvailable('');
        setImage('');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };




  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    
    const newDBook = { title: dtitle , author: dauthor , genre: dgenre , image: dimage }; 
    const response = await fetch('http://localhost:4000/api/donation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDBook)
    });
    
    try {
      const json = await response.json();
      console.log('JSON Response:', json);
  
      if (!response.ok) {
        console.log({ mssg: 'Error' });
      }
      if (response.ok) {
        dispatch({ type: 'CREATE_BOOK', payload: json });
        setDTitle('');
        setDAuthor('');
        setDGenre('');
        setDImage('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    const newBook = { title: dtitle , author: dauthor , genre: dgenre, available: 1 , image: dimage}; 
    const response2 = await fetch('http://localhost:4000/api/book/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    });
    
    try {
      const json2 = await response2.json();
      console.log('JSON Response:', json2);
  
      if (!response2.ok) {
        console.log({ mssg: 'Error' });
      }
      if (response2.ok) {
        dispatch({ type: 'CREATE_BOOK', payload: json2 });
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleIssueBook = async (e) => {
    e.preventDefault();
    const newRecord = { student_id, book_id, issued_date: date };
  
    // 1. Send request to create a new record
    const recordResponse = await fetch('http://localhost:4000/api/records/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecord),
    });
  
    try {
      const recordJson = await recordResponse.json();
      console.log('Record JSON Response:', recordJson);
  
      if (!recordResponse.ok) {
        console.log({ mssg: 'Error creating record' });
      } else {
        // 2. Send request to decrement available books
        const bookResponse = await fetch(`http://localhost:4000/api/book/${title}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateType: 'decrement' }),
        });
  
        try {
          const bookJson = await bookResponse.json();
          console.log('Book JSON Response:', bookJson);
  
          if (!bookResponse.ok) {
            console.log({ mssg: 'Error updating book details' });
          } else {
            // 3. Dispatch actions if needed
            dispatch({ type: 'CREATE_RECORD', payload: recordJson });
            dispatch({ type: 'UPDATE_RECORD', payload: bookJson.available });
          }
        } catch (error) {
          console.error('Error parsing book JSON:', error);
        }
      }
    } catch (error) {
      console.error('Error parsing record JSON:', error);
    }
  };
  const handleReturnBook = async (e) => {
    e.preventDefault();
    const newRecord = {returned_date: date };
  
    // 1. Send request to create a new record
    const recordResponse = await fetch(`http://localhost:4000/api/records/${student_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecord),
    });
  
    try {
      const recordJson = await recordResponse.json();
      console.log('Record JSON Response:', recordJson);
  
      if (!recordResponse.ok) {
        console.log({ mssg: 'Error creating record' });
      } else {
        // 2. Send request to decrement available books
        const bookResponse = await fetch(`http://localhost:4000/api/book/${title}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateType: 'increment' }),
        });
  
        try {
          const bookJson = await bookResponse.json();
          console.log('Book JSON Response:', bookJson);
  
          if (!bookResponse.ok) {
            console.log({ mssg: 'Error updating book details' });
          } else {
            // 3. Dispatch actions if needed
            dispatch({ type: 'UPDATE_RECORD', payload: recordJson });
            dispatch({ type: 'UPDATE_RECORD', payload: bookJson.available });
          }
        } catch (error) {
          console.error('Error parsing book JSON:', error);
        }
      }
    } catch (error) {
      console.error('Error parsing record JSON:', error);
    }
  };
  
  
  
  


  return (
    
    <div className="admin-library"><center>
      {user && (
          <div><h1>Welcome <span style={{
            textTransform:"capitalize"
          }}>{user.email.match(/^[^@]+/)[0]}</span></h1> </div>
        )}
      

      <div className="admin-actions">
      <form
        id="add-book-form"
        style={{ textAlign: "center" }} 
        onSubmit={handleAddSubmit}>
        <h3>Add Book</h3>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} value={author}/>
        <input type="text" placeholder="Genre" onChange={(e) => setGenre(e.target.value)} value = {genre}/>
        <input type="number" placeholder="Availablity" onChange={(e) => setBookAvailable(e.target.value)} value = {available}/>
        <input type="text" placeholder="Image Link" onChange={(e) => setImage(e.target.value)} value = {image}/>
        <button type="submit" >Add Book</button>
      </form>
{/*       

        <form id="add-student-form">
          <h3>Add/Remove Student</h3>

          <input type="text" placeholder="Student Name" onChange={(e) => setName(e.target.value)} value={name} />
          <input type="text" placeholder="Student ID" onChange={(e) => setRoll(e.target.value)} value={roll_no}/>
          <button className="addStudent-btn" type="submit" onClick={handleStudentAdd}>
            Add Student
          </button>
          <button className="removeStudent-btn" type="submit" onClick={handleStudentRemove}>
            Remove Student
          </button>
        </form> */}

        {/* <div className="issue-return">
          <h3>Issue/Return Books</h3>
          <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
          <input type="text" placeholder="Book ID" onChange={(e) => setBooKId(e.target.value)} value={book_id}/>
          <input type="text" placeholder="Student ID" onChange={(e) => setStudentID(e.target.value)} value={student_id}/>
          <input type="date"  onChange={(e) => setDate(e.target.value)} value={date}/>
          <button className="issue-btn" type="submit" onClick={handleIssueBook}>
            Issue
          </button>
          <button className="return-btn" type="submit" onClick={handleReturnBook}>
            Return
          </button>
        </div> */}

        <form id="donate-book-form" onSubmit={handleDonateSubmit}>
          <h3>Donate Book Record </h3>

          <input type="text" placeholder="Title" onChange={(e) => setDTitle(e.target.value)} value={dtitle}/>
          <input type="text" placeholder="Author" onChange={(e) => setDAuthor(e.target.value)} value={dauthor} />
          <input type="text" placeholder="Genre" onChange={(e) => setDGenre(e.target.value)} value={dgenre}/>
          <input type="text" placeholder="Image Link" onChange={(e) => setDImage(e.target.value)} value={dimage}/>
          <button type="submit">Donate Book</button>
        </form>
      </div>

      <div className="books-list">
        <h2>Books in Library</h2>

        <div className="book">
          <Books/>
        </div>
      </div>

      <div className="student-records">
        <h2>Students Records</h2>
        <StudentRecord/>
      </div>
      <div className="student-records issued-returned">
        <h2>Student Issue/Return Records</h2>
        <StudentIssueReturnRecord/>
      </div> 

      {/* <div className ="fine-details">
        <h2>Fine Details</h2>
        <div className="fine-record">
          <StudentFineRecord/>
        </div>
      </div> */}
      <div className="books-list">
        <h2>Donated Books Record</h2>
        <div className="book">
          <DonateBooks/>
        </div>


      </div>
      </center>
    </div>
  );
}
