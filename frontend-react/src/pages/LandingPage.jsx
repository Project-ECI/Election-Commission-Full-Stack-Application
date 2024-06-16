import main_image from '../assets/images/landing-page-main.png'
import Navbar1 from "../components/Navbar1"

function LandingPage() {
    return (
        <div>
            <Navbar1></Navbar1>

            <div className="landing-page-introduction padding-10">
                <div className='introduction-container'>
                    <p className='introduction-heading font-mont'>Election</p>
                    <p className='introduction-heading font-mont'>Commission</p>
                    <p className='introduction-subheading mt-4'>Safeguarding Democracy,</p>
                    <p className='introduction-subheading'>Ensuring Fair Elections</p>
                </div>
                <img src={main_image} alt="" className='introduction-image' />
            </div>

            <div className="user-section-container mt-5 mb-5 padding-10">
                <div className="user-section">
                    <h1>Parties</h1>
                    <button type='button' className='btn btn-outline-blue'>Party Registration</button>
                    <button type='button' className='btn btn-outline-blue'>Manage Applicants</button>
                    <button type='button' className='btn btn-blue'>Login</button>
                </div>
                <div className="user-section">
                    <h1>Voters</h1>
                    <button type='button' className='btn btn-outline-blue'>Register To Vote</button>
                    <button type='button' className='btn btn-outline-blue'>Download Voter ID</button>
                    <button type='button' className='btn btn-blue'>Login</button>
                </div>
                <div className="user-section">
                    <h1>Candidates</h1>
                    <button type='button' className='btn btn-outline-blue'>Register as Candidate</button>
                    <button type='button' className='btn btn-outline-blue'>Aplication Status</button>
                    <button type='button' className='btn btn-blue'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;