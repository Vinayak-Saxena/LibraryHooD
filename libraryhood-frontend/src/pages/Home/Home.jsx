import React from "react";
import { useState } from "react";
import image from "../../assets/bodyImage.jpg";
import { FaSearch  } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "./Home.css";
import UserBook from "../../components/Books/UserBook";

export default function Home() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <>
      <div className="homeContainer">
        <div className="homePage">
          <img className="img" src={image} />
        </div>
        <div className="welcomeText">
          <p>
            <span className="welcomeText1">
              Welcome to <br />
              LibraryHooD
            </span>{"   "}
            <br />
            <span className="welcomeText2">
              Libraryhood, we believe that every neighborhood deserves a <br />
              vibrant and thriving library. We are passionate about promoting
              literacy, fostering a love for reading, <br />
              and creating a community hub where people can come together to{" "}
              <br />
              explore the world of books and knowledge.
            </span>
          </p>
        </div>

        <span className="FindBookText">Find Your Book Of Choice:</span>
        
        <div className="searchBox">
          {/* <input
            type="text"
            name="search"
            placeholder="Search Your Book"
            className="search-input"
          /> */}
          <button 
          onClick={toggleModal}
          className="FaSearchIconButton">
            <FaSearch color="purple" size={32} />
          </button>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Search Your Book</h2>
             <UserBook/>
            
            <button className="close-modal" onClick={toggleModal}>
              <IoIosClose color="red" size={50} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}


