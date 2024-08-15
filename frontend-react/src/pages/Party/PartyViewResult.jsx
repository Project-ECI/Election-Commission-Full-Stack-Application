import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import PartySidebar from "../../components/PartySidebar.jsx";
import AllResult from "../AllResult.jsx";

function PartyViewResult() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <PartySidebar />

        <div className="right-homepage-container">
          <AllResult />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default PartyViewResult;
