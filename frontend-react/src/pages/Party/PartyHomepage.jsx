import "../../css/voter-homepage.css";
import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import React, { useEffect, useState } from "react";
import PartySidebar from "../../components/PartySidebar.jsx";

function PartyHomepage() {
  const [partyName, setPartyName] = useState("");

  useEffect(() => {
    const partyString = sessionStorage.getItem("party");
    if (partyString) {
      // Use regex to extract the partyName from the object string
      const match = partyString.match(/partyName=(.*?)(,|$)/);
      if (match) {
        setPartyName(match[1]); // Set the partyName state
      }
    }
  }, []); // Empty dependency array to run once on mount
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <PartySidebar />

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Welcome {partyName}
          </h1>
          <div className="placeholder-glow">
            <span className="placeholder bg-success voter-card"></span>
          </div>
          <button id="download-button" className="btn btn-blue mt-2">
            Download Voter-Id
          </button>

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
              <span className="placeholder col-10"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-8"></span>
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

      <Footer1 />
    </React.Fragment>
  );
}

export default PartyHomepage;
