import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import AllViewElectionDate from "../AllViewElectionDate.jsx";

function VoterAllDate() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <AllViewElectionDate />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default VoterAllDate;
