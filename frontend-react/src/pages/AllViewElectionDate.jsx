import "../css/voter-homepage.css";

import React, { useEffect, useState } from "react";
import globalService from "../services/global.service";

function AllViewElectionDate() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await globalService.getAllDate();
        setDates(response.data);
      } catch (e) {
        console.error("Something went wrong" + e);
        alert("Something went wrong" + e);
      }
    };
    getDate();
  }, []);

  return (
    <React.Fragment>
        <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
          Election Dates
        </h1>
        {dates.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>District Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((item, index) => (
                <tr key={index}>
                  <td>{item.districtId}</td>
                  <td>{item.electionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No election dates available.</p>
        )}
    </React.Fragment>
  );
}

export default AllViewElectionDate;
