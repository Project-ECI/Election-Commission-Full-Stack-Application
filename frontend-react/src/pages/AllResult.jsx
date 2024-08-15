import "../css/voter-homepage.css";

import React, { useEffect, useState } from "react";
import globalService from "../services/global.service";

function AllResult() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await globalService.getAllResult();
        setData(response.data);
      } catch (e) {
        console.error("Something went wrong" + e);
        alert("Something went wrong" + e);
      }
    };
    getDate();
  }, []);

  return (
    <React.Fragment>
      <div className="right-homepage-container">
        <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
          All District Result
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
                    {item.partyName ? item.partyName : "Independent Candidate"}
                  </td>
                  <td>{item.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Result not Declared Yet</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default AllResult;
