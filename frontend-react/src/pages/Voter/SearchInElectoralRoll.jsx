import "../../css/voter-homepage.css";
import "../../css/kyc.css";

import image from "../../assets/images/party-login.png";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import voterService from "../../services/voter.service.js";
import VoterSidebar from "../../components/VoterSidebar.jsx";

function SearchInElectoralRoll() {
    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <VoterSidebar />

                <div className="right-homepage-container">
                    <div className="registration-container">
                        <div className="reg-left-container">
                            <img src={image} className="img-fluid" width="320px" alt="" />
                        </div>

                        <div className="reg-right-container">
                            <h1 className="font-mont">Search In Electoral Roll</h1>

                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="voter-id">Voter-Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="voter-id"
                                        placeholder="Enter Voter-Id"
                                    />
                                </div>

                                <button className="btn btn-blue col-12" type="submit">
                                   Search
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="kyc-container mb-5">
                            <div className="left-kyc-container">
                                <div className="placeholder-glow">
                                    <span className="placeholder bg-success candidate-image"></span>
                                </div>
                            </div>

                            <div className="right-kyc-container">
                                <div>
                                    <h5 className="font-mont">Name: </h5>
                                    <p>Mrunal Maheshkar</p>
                                </div>
                                <div>
                                    <h5 className="font-mont">Gender: </h5>
                                    <p>Male</p>
                                </div>
                                <div>
                                    <h5 className="font-mont">Date of Birth: </h5>
                                    <p>03/06/20001</p>
                                </div>
                                <div>
                                    <h5 className="font-mont">Constituency: </h5>
                                    <p>Gadchiroli</p>
                                </div>
                            </div>
                        </div>
                </div>

            </div>

            <Footer1 />
        </React.Fragment>

    )
}

export default SearchInElectoralRoll;