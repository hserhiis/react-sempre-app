import React from "react";
import { Link } from "react-router-dom";

const ButtonBack = () => {
  return (
    <Link to="/" className="not-found__button">
      Go Back <span>👈</span>
    </Link>
  );
};

export default ButtonBack;
