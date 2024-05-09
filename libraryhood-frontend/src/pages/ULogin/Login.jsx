import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import "./Login.css";

export default function Login() {
  const redirect = useNavigate();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("Email:", email);
    console.log("Password:", pass);
    
    try {
      await login(email, pass);
      
      if (email === "admin@gmail.com" && pass === "Admin@1234") {
        navigate("/AdminProfile");
      } else {
        redirect("/user");
      }
    } catch (error) {
      // Handle login error, if any
      console.error("Login error:", error);
    }
  };
  

  return (

      <center>
        <div className="container">
          <div className="loginpage">
            <h1>
              <span>L</span>
              <span>O</span>
              <span>G</span>
              <span>I</span>
              <span>N</span>
            </h1>
          </div>
          <div className="loginform">
            <div className="formInputs">
              <div className="inputLogin">
                <label htmlFor="inputEmail">Enter Email Address *</label>
                <input
                  type="email"
                  id="inputEmail"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Example@email.com"
                /> <br /> <br />
              </div>
              <div className="inputLogin">
                <label htmlFor="inputPass">Password *</label>
                <input
                  type="password"
                  id="inputPass"
                  value={pass}
                  onChange={handlePasswordChange}
                  placeholder="At least 8 characters"
                /><br /> <br />
              </div>
              <button
                className="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button><br /> <br />
              {error && <div className="error">{error}</div>}
              {/* <div className="forgetPass">
              Forgot Password
              </div> */}
              <label htmlFor="signup">New User</label>

              <button
                className="signUpButton"
                onClick={() => {
                  redirect("/signup");
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </center>

  );
}
