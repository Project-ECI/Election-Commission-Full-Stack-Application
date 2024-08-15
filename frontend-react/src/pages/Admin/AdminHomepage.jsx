import "../../css/voter-homepage.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import AdminSidebar from "../../components/AdminSidebar.jsx";

import React from "react";

function AdminHomepage() {
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <AdminSidebar></AdminSidebar>

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Welcome Admin Username!
          </h1>
          <div className="placeholder-glow">
            <span className="placeholder bg-success voter-card"></span>
          </div>

          <div className="voter-content mt-5">
            <h1 className="font-mont text-center" style={{ fontWeight: "600" }}>
              Lorem ipsum dolor sit amet
            </h1>
            <p className="placeholder-glow mt-4">
              <span className="placeholder col-10"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-8"></span>
            </p>

            <p className="placeholder-glow">
              <span className="placeholder col-6"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-10"></span>
            </p>

            <p className="placeholder-glow">
              <span class="placeholder col-10"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-10"></span>
              <span class="placeholder col-8"></span>
            </p>

            <p className="placeholder-glow">
              <span className="placeholder col-6"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-10"></span>
            </p>

            <p className="placeholder-glow">
              <span className="placeholder col-6"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-10"></span>
            </p>

            <p className="placeholder-glow">
              <span className="placeholder col-10"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      </div>

      <Footer1></Footer1>
    </React.Fragment>
  );
}

export default AdminHomepage;
