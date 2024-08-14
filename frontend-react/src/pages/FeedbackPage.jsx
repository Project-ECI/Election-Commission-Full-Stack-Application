import "../css/voter-homepage.css";

import image from "../assets/images/image-for-loginpage.png"

import React, { useEffect, useState } from "react";

function FeedbackPage() {
    return (
        <React.Fragment>
            <div className="registration-container">
                <div className="reg-left-container">
                    <img src={image} className="img-fluid" width="320px" alt="" />
                </div>

                <div className="reg-right-container">
                    <h1 className="font-mont">Feedback Form</h1>

                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="body">Do you have suggestions on what we can do to provide you with a better service?</label>
                            <textarea  rows="5" className="form-control" id="body" placeholder="Type here..."></textarea>
                        </div>

                        <button className="btn btn-blue col-12" type="submit">
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FeedbackPage;