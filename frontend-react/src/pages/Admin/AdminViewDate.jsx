import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import AllViewElectionDate from "../AllViewElectionDate.jsx";
import AdminSidebar from "../../components/AdminSidebar";
function AdminViewDate() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <AdminSidebar />

        <div className="right-homepage-container">
          <AllViewElectionDate />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default AdminViewDate;
