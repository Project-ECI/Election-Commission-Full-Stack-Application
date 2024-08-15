import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import PartySidebar from "../../components/PartySidebar.jsx";
import ComplaintPage from "../ComplaintPage.jsx";

function PartyComplaint() {
    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <PartySidebar />

                <div className="right-homepage-container">
                    <ComplaintPage/>
                </div>
                
            </div>
            <Footer1 />
        </React.Fragment>
    )
}

export default PartyComplaint;