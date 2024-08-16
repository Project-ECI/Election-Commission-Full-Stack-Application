import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import voterService from "../../services/voter.service.js";
import { toast } from "react-toastify";

function VoterDistrictDate() {
  const [dates, setDates] = useState(null);

  useEffect(() => {
    const getDate = async () => {
      try {
        const voterId = sessionStorage.getItem("id");

        const response = await voterService.viewDate(voterId);
        setDates(response.data);
        if (dates !== null) {
          toast.success("Date Found");
        } else toast.info("Election are not scheduled");
      } catch (e) {
        console.error("Something went wrong" + e);
        toast.error("Something went wrong");
      }
    };
    getDate();
  }, []);

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Election Dates of Your District
          </h1>
          {dates !== null ? (
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>District Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dates.districtId}</td>
                  <td>{dates.electionDate}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No election dates available.</p>
          )}
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default VoterDistrictDate;
