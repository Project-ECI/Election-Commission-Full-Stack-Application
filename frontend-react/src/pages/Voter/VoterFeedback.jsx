import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import FeedbackPage from "../FeedbackPage.jsx";

function VoterFeedback() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <FeedbackPage />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default VoterFeedback;
