import "../../css/voter-homepage.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import AdminSidebar from "../../components/AdminSidebar.jsx";

import React, { useEffect, useState } from "react";
import adminService from "../../services/admin.service.js";

function ViewFeedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await adminService.getAllFeedback();
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log("Failed to fetch feedback: " + err);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <AdminSidebar />

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Feedback
          </h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {data.map((feedback) => (
                  <tr key={feedback.feedbackId}>
                    <td>{feedback.feedbackId}</td>
                    <td>{feedback.feedbackDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default ViewFeedback;
