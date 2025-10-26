import { Link } from 'react-router';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCartContext } from '../../store/CartContext';
import './Navbar.css';
import {FaShoppingCart} from 'react-icons/fa'
import '../../index.css'

const Navbar = () => {
  const navigate = useNavigate()
  const {mostrarCarrito, alojamientosDeseados} = useCartContext();

  const irAChekout = () => {
    navigate("/checkout")
  }

  const cantidadTotalHabitaciones = alojamientosDeseados.reduce((acc, a) => acc + a.cantidadHabitaciones, 0);

  return (
    <header className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon">☰</button>
        </div>

        <div className="navbar-section center">
          <div className="brand">
            <Link to={`/`} className="link-no-style"><h1 className="brand-text"> Cirbnb.com </h1></Link>
          </div>
        </div>

        <div className="navbar-section right">
          <button className="cart" onClick={mostrarCarrito}>
            <FaShoppingCart color="white"/>
            <span className="cart-count">{cantidadTotalHabitaciones}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
