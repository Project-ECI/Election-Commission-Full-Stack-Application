import "../css/navbar.css"
import logo from '../assets/images/logo.png'

function Navbar1() {
    return (
         <nav className='padding-10 shadow'>
            <div className='nav-left-container mt-1 mb-1'>
                <img src={logo} alt="" height="50px" width="50px"/>
                <span className='font-mont nav-heading'>Election Commission</span>
            </div>

            <div className='nav-right-container'>
                <a>About Us</a>
                <a>Contact Us</a>
                <button className='btn btn-outline-blue'>Login</button>
                <button className='btn btn-blue'>Register</button>
            </div>
         </nav>  
    )
}

export default Navbar1;