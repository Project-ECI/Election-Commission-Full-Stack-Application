import "../css/voter-homepage.css";

import image from "../assets/images/image-for-loginpage.png"

import React, { useEffect, useState } from "react";

function ComplaintPage() {
    return (
        <React.Fragment>
            <div className="registration-container">
                <div className="reg-left-container">
                    <img src={image} className="img-fluid" width="320px" alt="" />
                </div>

                <div className="reg-right-container">
                    <h1 className="font-mont">Register A Complaint</h1>

                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="username">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                placeholder="What is this complaint about?"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="body">Complaint Body</label>
                            <textarea rows="5" className="form-control" id="body" placeholder="Type here..."></textarea>
                        </div>

                        <button className="btn btn-blue col-12" type="submit">
                            Register Complaint
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ComplaintPage;