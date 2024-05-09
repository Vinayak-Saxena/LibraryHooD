import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup"
import "./signup.css";
import { useBooksContext } from '../../hooks/useBookContext';

export default function SignUp() {
  const { dispatch } = useBooksContext();
  const [name, setName] = useState("");
  // const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup , error } = useSignup()

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  // const handleRollChange = (event) => {
  //   setRoll(event.target.value);
  // };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault()
    if
    (name === "" ||  email === "" || password === "" ){
      alert('Please fill all fields');
      } else if (!/^[a-zA-Z0-9._]+@[a-z.]+$/.test(email))
      {
        alert('Invalid Email Address')
        }else{            
    console.log("Name :", name);

    console.log("Email:", email);
    console.log("PassWord:", password);
  };
  await signup(name , email , password )

  // const newStudent = {name , email , roll_no : roll }; 
  //   const response = await fetch('http://localhost:4000/api/library/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newStudent)
  //   });
  //   try {
  //     const json = await response.json();
  //     console.log('JSON Response:', json);
  
  //     if (!response.ok) {
  //       console.log({ mssg: 'Error' });
  //     }
  //     if (response.ok) {
  //       dispatch({ type: 'ADD_STUDENT', payload: json });
  //     }
  //   } catch (error) {
  //     console.error('Error parsing JSON:', error);
  //   }






}

  return (
      <center>
        <div className="container-signup">
          <div className="signuppage">
            <h1>Don't have an Account ?</h1>
            <h1>Let's Create One</h1>
          </div>
          <div className="signupForm">
            <div className="formInputs">
              <div className="inputSignUp">
                <label htmlFor="formName">Name:</label>
                <input
                  type="email"
                  id="formName"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleNameChange}
                />
                <br />
                <br />
              </div>
              {/* <div className="inputSignUp">
                <label htmlFor="formEmail">Roll No:</label>
                <input
                  type="number"
                  id="formRoll"
                  placeholder="Enter Your Roll No"
                  value={roll}
                  onChange={handleRollChange}
                />
                </div> */}
                
                <br />
              <div className="inputSignUp">
                <label htmlFor="formEmail">Email:</label>
                <input
                  type="email"
                  id="formEmail"
                  placeholder="Eg: example@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <br />
                <br />
              </div>
              <div className="inputSignUp">
                <label htmlFor="formPass">Enter Password:</label>
                <input
                  type="password"
                  id="formPass"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <br />
                <br />
              </div>
              <button className="SignUpButton" onClick={handleSignUp} >
                Sign Up
              </button>
              {error && <div className="error" style={ {color : "red"} }><center>{error}</center></div>}
              <br />
              <br />
            </div>
          </div>
        </div>
      </center>
  );
}
