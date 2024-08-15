import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import AllViewElectionDate from "../AllViewElectionDate.jsx";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";

function CandidateViewDate() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <CandidateSidebar />

        <div className="right-homepage-container">
          <AllViewElectionDate />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default CandidateViewDate;
