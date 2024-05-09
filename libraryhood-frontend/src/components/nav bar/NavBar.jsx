import React from "react";
import  useLogout  from '../../hooks/useLogout'; 
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";

import image1 from "../../assets/library.gif";
import image2 from "../../assets/geology.gif";

import "./navBar.css";

export default function NavBar() {
  const redirect = useNavigate();
  const logout = useLogout(); 
  const { user } = useAuthContext();

  const handleClick = () => {
    logout(); 
    redirect("/login");
  };

  return (
    <div className="navBar">
      <div className="nav-icon1">
        <img src={image1} alt="icon" width="65"/>
      </div>
      <div className="navText">
        <u>LibraryHooD</u>
      </div>
      <div className="navButtons">
        {user && (          
          <div ><span style={{
            textTransform:"capitalize",
            color:"red"
          }}
          onClick={() => {
            if(user.email == "admin@gmail.com"){
              redirect("/AdminProfile");}
            else{redirect("/user");}
          }}
          
          
          >{user.email.match(/^[^@]+/)[0]}</span>
            <button className="homeButton"

              onClick={() => {
                redirect("/");
              }}
            >
              <u>Home</u>
            </button>
            <button className="loginButton" onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <button className="homeButton"
              onClick={() => {
                redirect("/");
              }}
            >
              <u>Home</u>
            </button>
            <button className="loginButton"
              onClick={() => {
                redirect("/login");
              }}
            >
              <u>Login</u>
            </button>
          </div>
        )}
        <img src={image2} alt="icon" width="50"/>
      </div>
    </div>
  );
}
