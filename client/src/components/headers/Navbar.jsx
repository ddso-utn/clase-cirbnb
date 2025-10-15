import { Link } from 'react-router';
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {FaShoppingCart} from 'react-icons/fa'
import '../../index.css'

const Navbar = ({carrito}) => {
  const [cantHabitaciones, setCantHabitaciones] = useState(0);

  const cantHabitacionesEnCarrito = () => {
    console.log(carrito)
    let suma = 0
    for (const hotel of carrito) {
      suma += hotel.cantidadHabitaciones
    }
    return suma;
  }

  useEffect(() => {
    setCantHabitaciones(cantHabitacionesEnCarrito());
  }, [carrito]);

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
          <button className="cart">
            <FaShoppingCart color="white"/>
            <span className="cart-count">{cantHabitaciones}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;