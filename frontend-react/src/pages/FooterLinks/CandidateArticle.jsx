import "../../css/registration.css"


import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";
import image from "../../assets/images/image-for-registrationpage.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function CandidateGuides(){
    return (
        <div>
            <Navbar1></Navbar1>
            
          {/* Registration Section */}
          <div className="registration-container margin-10">
                {/* Left Container */}
                <div className="reg-left-container">
                    <h1 className="font-mont">Candidates Guide</h1>

                    <p className="mt-3">Introduction
                    The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India. This guide aims to provide potential candidates with essential information regarding their candidacy, eligibility, nomination process, and responsibilities.
                    </p>
                    {/* <p className="mt-3">Designed to empower citizens, our platform ensures that
                        your voice is heard and your vote counts. Register today to become
                        an active participant in shaping the future of your community and
                        country with the "Election Commission".
                    </p> */}

                    <img src={image} className="img-fluid" width="320px" alt="" />
                </div>

                {/* Right Container */}
                <div className="reg-right-container">
                    <h1 className="font-mont">Candidate Guide</h1>
                    <header>
        {/* <h1>Candidate Guide for Elections</h1> */}
        {/* <h2>Election Commission of India</h2> */}
    </header>
    
        {/* <section id="introduction">
            <h3>Introduction</h3>
            <p>The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India. This guide aims to provide potential candidates with essential information regarding their candidacy, eligibility, nomination process, and responsibilities.</p>
        </section> */}
        
        <section id="eligibility">
            <h3>Eligibility Criteria</h3>
            <h4>General Requirements</h4>
            <ul>
                <li><strong>Citizenship:</strong> The candidate must be a citizen of India.</li>
                <li><strong>Age:</strong>
                    <ul>
                        <li>Lok Sabha: At least 25 years old.</li>
                        <li>Rajya Sabha: At least 30 years old.</li>
                        <li>State Legislative Assemblies: At least 25 years old.</li>
                        <li>State Legislative Councils: At least 30 years old.</li>
                    </ul>
                </li>
                <li><strong>Voter Registration:</strong> The candidate must be a registered voter in any parliamentary constituency.</li>
            </ul>

            <h4>Disqualifications</h4>
            <p>A candidate may be disqualified if:</p>
            <ul>
                <li>They hold an office of profit under the Government of India or the Government of any State.</li>
                <li>They are of unsound mind and stand so declared by a competent court.</li>
                <li>They are an undischarged insolvent.</li>
                <li>They have been convicted of an offense and sentenced to imprisonment for two years or more.</li>
            </ul>
        </section>

                   
                </div>
            </div>


            <Footer1></Footer1>
        </div>
    );
}

export default CandidateGuides;