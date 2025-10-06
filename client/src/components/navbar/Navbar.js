import './Navbar.css';
import {FaShoppingCart} from 'react-icons/fa'

const Navbar = () => {
  return (
    <header className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon">☰</button>
        </div>

        <div className="navbar-section center">
          <div className="brand">
            <h1 className="brand-text"> Cirbnb.com </h1>
          </div>
        </div>

        <div className="navbar-section right">
          <button className="cart">
            <FaShoppingCart color="white"/>
            <span className="cart-count">0</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;