import React from "react";
import "./AboutUs.css";
import image1 from "../../assets/facebook.png";
import image2 from "../../assets/instagram.png";
import image3 from "../../assets/whatsapp.png";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <footer className="footer-class">
      <div className="aboutusText" >
        <span className="aboutusText1">About US</span> <br />
        <br />
        <div className="containeraboutUs">
          <div className="box text ">
            <span className="aboutusText2">
              LibraryHooD <br />{" "}
            </span>
            <p className="aboutusText3">
              Stay connected with LibraryHooD! Follow <br />
              us on social media to stay up-to-date <br />
              on our events, new arrivals, brand promotions.
            </p>
          </div>
          <div className="box social-media">
            <div>
              <Link to="www.facebook.com">
                <img src={image1} alt="facebook-logo" width={30} />
              </Link>
            </div>
            <div>
              <Link to="www.instagram.com">
                <img src={image2} alt="facebook-logo" width={30} />
              </Link>
            </div>
            <div>
              <Link to="www.whatsapp.com">
                <img src={image3} alt="facebook-logo" width={30} />
              </Link>
            </div>
          </div>
          <div className="box useful-links">
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
            Home
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
