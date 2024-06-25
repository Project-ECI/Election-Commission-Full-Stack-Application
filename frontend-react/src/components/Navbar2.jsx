import "../css/navbar.css"
import logo from '../assets/images/logo.png'

// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

function Navbar2() {
    return (
        <nav className='navbar padding-10 shadow'>
            <div className='nav-left-container mt-1 mb-1'>
                <Link to="/"><img className="nav-image" src={logo} alt="" height="50px" width="50px" /></Link>
                <Link to="/" className="nav-link-heading"><span className='font-mont nav-heading'>Election Commission</span></Link>
            </div>

            <div className='nav-right-container'>
                <Link to="#footer" className="nav-links">About Us</Link>
                <Link to="#footer" className="nav-links">Contact Us</Link>
            </div>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
    )
}

export default Navbar2;