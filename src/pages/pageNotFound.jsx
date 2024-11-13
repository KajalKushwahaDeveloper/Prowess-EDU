import React from "react";
import { Link } from "react-router-dom";
import pageNotFound from "../assets/images/pageNotFound.png";
const NotFound = () => {
  return (
    <>
      <div className="notfound-container">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <img src={pageNotFound}/>
        <Link to="/login">Go to Home</Link>
      </div>
    </>
  );
};

export default NotFound;