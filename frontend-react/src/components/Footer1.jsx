import logo from "../assets/images/logo.png"
import instagram from "../assets/icons/instagram.png"
import facebook from "../assets/icons/facebook.png"
import twitter from "../assets/icons/twitter.png"
import email from "../assets/icons/email.png"
import github from "../assets/icons/github.png"

function Footer1() {
    return (
        <div>
            <footer className="padding-10">
                <div className="footer-left-container">
                    <h5 className="font-mont" style={{ textDecoration: "underline" }}>Election Commission</h5>
                    <img src={logo} alt="" width="120px" />
                    <p className="footer-left-container-p">The Election Commission of India is an autonomous constitutional authority responsible for administering election processes in India. The body administers elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies in India, and the offices of the President and Vice President in the country.</p>
                </div>

                <div className="footer-right-container">
                    <h5 className="mb-2 font-mont" style={{ textDecoration: "underline" }}>Quick Links</h5>
                    <div className="quick-links-container">
                        <div>
                            <li>Voter's Guide</li>
                            <li>Candidate's Guide</li>
                            <li>Party's Guide</li>
                        </div>
                        <div>
                            <li>Know Your Candidate</li>
                            <li>Election Dates</li>
                            <li>Search Electoral Roll</li>
                        </div>
                        <div>
                            <li>Become a Better Voter</li>
                            <li>Party's Principles</li>
                            <li>Candidate's Code</li>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom padding-10">
                <div className="footer-bottom-left">
                    <p>Connect to us on: </p>
                    <i class="bi bi-instagram footer-icons"></i>
                    <i class="bi bi-facebook footer-icons"></i>
                    <i class="bi bi-twitter-x footer-icons"></i>
                    <i class="bi bi-envelope footer-icons"></i>
                </div>
                <div className="footer-bottom-right">
                    <p>Github Repository: </p>
                    <i class="bi bi-github footer-icons"></i>
                </div>
            </div>
        </div>
    )
}

export default Footer1;