import "../../css/voter-homepage.css"

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import Sidebar from "../../components/Sidebar.jsx";

import React from "react";

function VoterHomepage() {
    return (
        <React.Fragment>
            <Navbar3></Navbar3>

            <div className="homepage-container">
                <Sidebar></Sidebar>

                <div className="right-homepage-container">
                    <h1 className="font-mont mb-2">Welcome Username!</h1>
                    <div className="icard">
                    </div>
                    <button id="download-button" className="btn btn-blue mt-2">Download Voter-Id</button>

                    <div className="voter-content mt-5">
                        <h1 className="font-mont text-center">Lorem ipsum dolor sit amet</h1>
                    </div>
                </div>
            </div>

            <Footer1></Footer1>
        </React.Fragment>
    )
}

export default VoterHomepage;