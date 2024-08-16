import "../css/voter-homepage.css";

import React, { useEffect, useState } from "react";
import globalService from "../services/global.service";
import { toast } from "react-toastify";

function AllResult() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await globalService.getAllResult();
        setData(response.data);
        if (data !== null) {
          toast.info("Result Found");
        } else toast.info("Election result is not declared yet");
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
        Results Declared In All Constituencies
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
        <div className="alert alert-warning" role="alert">
          Results are yet to be declared.
        </div>
      )}
    </React.Fragment>
  );
}

export default AllResult;
