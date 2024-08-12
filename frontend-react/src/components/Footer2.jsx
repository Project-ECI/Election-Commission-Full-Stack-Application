import "../css/footer.css";
import logo from "../assets/images/logo.png";

import { Link } from "react-router-dom";

function Footer2() {
  return (
    <div>
      <footer id="footer" className="padding-10 footer-2">
        <div className="footer-left-container">
          <h5 className="font-mont" style={{ textDecoration: "underline" }}>
            Election Commission
          </h5>
          <img className="mb-1" src={logo} alt="" width="100px" />
          <p className="footer-left-container-p">
            The Election Commission of India is an autonomous constitutional
            authority responsible for administering election processes in India.
            The body administers elections to the Lok Sabha, Rajya Sabha, State
            Legislative Assemblies in India, and the offices of the President
            and Vice President in the country.
          </p>
        </div>

        <div className="footer-right-container">
          <h5
            className="mb-2 font-mont"
            style={{ textDecoration: "underline" }}
          >
            Quick Links
          </h5>
          <div className="quick-links-container">
            <div>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Voter's Guide</li>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom padding-10">
        <div className="footer-bottom-left">
          <p>Connect to us on: </p>
          <i className="bi bi-instagram footer-icons"></i>
          <i className="bi bi-facebook footer-icons"></i>
          <i className="bi bi-twitter-x footer-icons"></i>
          <i className="bi bi-envelope footer-icons"></i>
        </div>
        <div className="footer-bottom-right">
          <p>Github Repository: </p>
          <i className="bi bi-github footer-icons"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer2;
