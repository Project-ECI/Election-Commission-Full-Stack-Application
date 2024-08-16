import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import voterService from "../../services/voter.service.js";
import { toast } from "react-toastify";

function VoterDistrictResult() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDate = async () => {
      try {
        const id = sessionStorage.getItem("districtId");
        if (id) {
          const response = await voterService.getDistrictResult(id); // Pass the id directly
          setData(response.data);
        }
      } catch (e) {
        console.error("Something went wrong: " + e);
        toast.error("Something went wrong");
      }
    };
    getDate();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Your District Result
          </h1>
          {data.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Candidate Name</th>
                  <th>Constituency</th>
                  <th>Party </th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.candiateName}</td>
                    <td>{item.districtName}</td>
                    <td>
                      {item.partyName
                        ? item.partyName
                        : "Independent Candidate"}
                    </td>
                    <td>{item.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-warning" role="alert">
              The results are yet to be declared. Check again after some time.
            </div>
          )}
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default VoterDistrictResult;
