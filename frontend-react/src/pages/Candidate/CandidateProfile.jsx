import image from "../../assets/images/image-for-loginpage.png"

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import React, { useEffect, useState } from "react";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";

function CandidateProfile() {
    const fullname = sessionStorage.getItem("fullname");
    const partyName = sessionStorage.getItem("partyName");
    const status = sessionStorage.getItem("status");
    const constituencyName = sessionStorage.getItem("constituencyName");

    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <CandidateSidebar />

                <div className="right-homepage-container">
                    <div className="registration-container">
                        <div className="reg-left-container">
                            {/* <h1 className="font-mont" style={{color:"white"}}>Update Voter Profile</h1> */}
                            <img src={image} className="img-fluid" width="320px" alt="" />
                        </div>

                        <div className="reg-right-container">
                            <h1 className="font-mont">Candidate Profile</h1>

                            <form>
                                {/* Full Name */}
                                <div className="form-group mb-3">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        value={fullname}
                                        disabled
                                    />
                                </div>

                                {/* Party Name */}
                                <div className="form-group mb-3">
                                    <label htmlFor="party-name">Party Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="party-name"
                                        value={partyName}
                                        disabled
                                    />
                                </div>

                                {/* Application Status */}
                                <div className="form-group mb-3">
                                    <label htmlFor="status">Application Status</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="status"
                                        value={status}
                                        disabled
                                    />
                                </div>

                                {/* District */}
                                <div className="form-group mb-3">
                                    <label htmlFor="constituency">Constituency</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="constituency"
                                        value={constituencyName}
                                        disabled
                                    />
                                </div>

                                <div class="alert alert-warning" role="alert">
                                    Once a candidate profile is created, it cannot be updated. To make any changes to personal details, please update your Voter profile.
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

export default CandidateProfile;