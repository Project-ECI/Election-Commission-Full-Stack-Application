import image from "../../assets/images/image-for-registrationpage.png"

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";

function CandidateSettings() {
    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <CandidateSidebar />

                <div className="right-homepage-container">
                    <div className="registration-container">
                        <div className="reg-left-container">
                            <img src={image} className="img-fluid" width="320px" alt="" />
                        </div>

                        <div className="reg-right-container">
                            <h1 className="font-mont">Account Settings</h1>

                            <form>
                                <div className="form-group mb-3">
                                    <button className="btn btn-blue col-12" type="button">Enable 2FA</button>
                                </div>

                                <div className="form-group mb-3">
                                    <button style={{height: "40px"}} className="btn btn-primary col-12" type="button" disabled>Change Password</button>
                                    <small id="passwordHelp" class="form-text text-muted">Please update the password through the Voter profile.</small>
                                </div>

                                <div className="form-group mb-3">
                                    <button className="btn btn-danger col-12" type="button">Delete Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <Footer1 />
        </React.Fragment>
    )
}

export default CandidateSettings;