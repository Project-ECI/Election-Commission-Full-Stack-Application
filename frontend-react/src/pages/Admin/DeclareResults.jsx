import "../../css/voter-homepage.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import AdminSidebar from "../../components/AdminSidebar.jsx";

import React from "react";

function DeclareResults() {
  return (
    <React.Fragment>
      <Navbar3></Navbar3>

      <div className="homepage-container">
        <AdminSidebar></AdminSidebar>

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Declare Results
          </h1>


        </div>
      </div>

      <Footer1></Footer1>
    </React.Fragment>
  )
}

export default DeclareResults;