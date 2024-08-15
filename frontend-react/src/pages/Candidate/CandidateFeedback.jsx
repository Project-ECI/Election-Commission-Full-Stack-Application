import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";
import FeedbackPage from "../FeedbackPage.jsx";

function CandidateFeedback() {
    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <CandidateSidebar />

                <div className="right-homepage-container">
                    <FeedbackPage/>
                </div>
                
            </div>
            <Footer1 />
        </React.Fragment>
    )
}

export default CandidateFeedback;