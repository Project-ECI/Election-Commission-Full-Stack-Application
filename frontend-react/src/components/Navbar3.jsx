import "../css/navbar.css";
import logo from "../assets/images/logo.png";

// import { Link } from 'react-router-dom';
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

function Navbar3() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const role = sessionStorage.getItem("role");
    sessionStorage.clear();
    if (role) navigate(`/${role}/login`);
    else navigate("/");
  }

  const handleHome = () => {
    const role = sessionStorage.getItem("role");
    if (role) navigate(`/${role}/home`);
    else navigate("/");
  }

  const handleProfile = () => {
    const role = sessionStorage.getItem("role");
    if (role) navigate(`/${role}/profile`);
    else navigate("/");
  };

  return (
    <nav className="navbar padding-10 shadow">
      <div className="nav-left-container mt-1 mb-1">
        <Link to={sessionStorage.getItem("role") ? `/${sessionStorage.getItem("role")}/home` : "/"}>
          <img
            className="nav-image"
            src={logo}
            alt=""
            height="50px"
            width="50px"
          />
        </Link>

        <Link to={sessionStorage.getItem("role") ? `/${sessionStorage.getItem("role")}/home` : "/"} className="nav-link-heading">
          <span className="font-mont nav-heading">Election Commission</span>
        </Link>
      </div>

      <div className="nav-right-container">
        <button onClick={handleHome} className="btn">
          Home
        </button>
        <button onClick={handleProfile} className="btn">
          Profile
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
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
export default Navbar3;
