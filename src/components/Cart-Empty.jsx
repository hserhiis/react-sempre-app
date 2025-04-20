import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.png";

export const CartEmpty = () => (
  <div className="cart cart--empty">
    <h2>
      Nie ma nic <span>😕</span>
    </h2>
    <p>
      Niestety koszyk jest na razie pusty
      <br />
      Zeby zobaczyc oferty kliknij "Wróć"
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Wróć</span>
    </Link>
  </div>
);
