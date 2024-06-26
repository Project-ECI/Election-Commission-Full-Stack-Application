import "../../css/feedback.css";

import Footer1 from "../../components/Footer1.jsx";
import image from "../../assets/images/image-for-registrationpage.png";
import { FaStar } from "react-icons/fa";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
function Feedback() {
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSuggestionChange = (event) => {
    setSuggestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send feedback data to server
    console.log("Rating:", rating);
    console.log("Suggestion:", suggestion);
    // Reset form if needed
    setRating(0);
    setSuggestion("");
  };
  const StarRating = ({ rating, onRatingChange }) => {
    const totalStars = 5;
    const starIcons = [];

    for (let i = 1; i <= totalStars; i++) {
      starIcons.push(
        <span
          key={i}
          onClick={() => onRatingChange(i)}
          style={{
            color: i <= rating ? "#ffc107" : "#e4e5e9",
            cursor: "pointer",
          }}
        >
          <FaStar />
        </span>
      );
    }

    return <div>{starIcons}</div>;
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <Sidebar></Sidebar>

        <div className="registration-container margin-10">
          {/* Left Container */}
          <div className="reg-left-container">
            <h1 className="font-mont">Feedback Please!</h1>
            <img src={image} className="img-fluid" width="320px" alt="" />
          </div>
          {/* Right Container */}
          <div className="reg-right-container">
            <h1 className="font-mont">Feedback Form</h1>
            {/* star */}
            <form onSubmit={handleSubmit}>
              <div className="rating-section form-group  mb-3">
                <label>Rate your experience:</label>
                <StarRating
                  className="form-control"
                  rating={rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              {/* Suggetion */}
              <div className="suggestion-section form-group mb-3 ">
                <label> Any suggestions?</label>
                <textarea
                  value={suggestion}
                  onChange={handleSuggestionChange}
                  placeholder="Enter your suggestions..."
                  className="form-control "
                />
              </div>
              <button className="btn btn-blue col-12" type="submit">
                Submit Feedback
              </button>
            </form>
          </div>{" "}
        </div>
      </div>

      <Footer1></Footer1>
    </div>
  );
}

export default Feedback;
