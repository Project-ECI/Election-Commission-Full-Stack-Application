import "../css/voter-homepage.css";

import image from "../assets/images/image-for-loginpage.png";

import React, { useState } from "react";
import globalService from "../services/global.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FeedbackPage() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const response = await globalService.addFeedback(description);
    const role = sessionStorage.getItem("role");
    if (response.data === "success") toast.success("Feedback Submitted");
    else toast.error("Something went wrong");
    if (role && role.toLowerCase() === "voter") {
      navigate("/voter/home");
    } else if (role && role.toLowerCase() === "party") {
      navigate("/party/home");
    } else if (role && role.toLowerCase() === "candidate") {
      navigate("/candidate/home");
    } else {
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <div className="registration-container">
        <div className="reg-left-container">
          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        <div className="reg-right-container">
          <h1 className="font-mont">Feedback Form</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="body">
                Do you have suggestions on what we can do to provide you with a
                better service?
              </label>
              <textarea
                rows="5"
                className="form-control"
                id="body"
                placeholder="Type here..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-blue col-12" type="submit">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FeedbackPage;
