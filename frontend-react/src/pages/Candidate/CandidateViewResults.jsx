import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";
import AllResult from "../AllResult.jsx";

function CandidateViewResults() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <CandidateSidebar />

        <div className="right-homepage-container">
          <AllResult />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default CandidateViewResults;
