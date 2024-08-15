import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React from "react";
import AdminSidebar from "../../components/AdminSidebar.jsx";
import AllResult from "../AllResult.jsx";

function AdminViewResult() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <AdminSidebar />

        <div className="right-homepage-container">
          <AllResult />
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default AdminViewResult;
