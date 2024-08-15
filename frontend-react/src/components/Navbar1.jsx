import "../css/navbar.css";
import logo from "../assets/images/logo.png";

// import { Link } from 'react-router-dom';
import { HashLink as Link } from "react-router-hash-link";

function Navbar1() {
  return (
    <nav id="navbar" className="navbar padding-10 shadow">
      <div className="nav-left-container mt-1 mb-1">
        <Link to="/">
          <img
            className="nav-image"
            src={logo}
            alt=""
            height="50px"
            width="50px"
          />
        </Link>
        <Link to="/" className="nav-link-heading">
          <span className="font-mont nav-heading">Election Commission</span>
        </Link>
      </div>

      <div className="nav-right-container">
        <Link to="#footer" className="nav-links">
          About Us
        </Link>
        <Link to="#footer" className="nav-links">
          Contact Us
        </Link>
        <Link to="#user-section">
          <button className="btn btn-outline-blue">Login</button>
        </Link>
        <Link to="#user-section">
          <button className="btn btn-blue">Register</button>
        </Link>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}

export default Navbar1;
