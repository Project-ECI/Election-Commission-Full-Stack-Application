import main_image from '../assets/images/landing-page-main.png'

import Navbar1 from "../components/Navbar1"

function LandingPage(){
    return(
        <div>
            <Navbar1></Navbar1>
            <div className="landing-page-introduction padding-10">
                <div className='introduction-container'>
                    <p className='introduction-heading font-mont'>Election</p>
                    <p className='introduction-heading font-mont'>Commission</p>
                    <p className='introduction-subheading mt-4'>Safeguarding Democracy,</p>
                    <p className='introduction-subheading'>Ensuring Fair Elections</p>
                </div>
                <img src={main_image} alt="" className='introduction-image'/>
            </div>
        </div>
    )
}

export default LandingPage;