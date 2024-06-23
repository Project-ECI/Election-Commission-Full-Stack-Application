import "../../css/registration.css"

import Navbar1 from "../../components/Navbar1";
import Footer1 from "../../components/Footer1"

import image from "../../assets/images/image-for-registrationpage.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

function VoterRegPage() {
    // State and cities dropdown
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setSelectedState(selectedState);

        switch (selectedState) {
            case "Maharashtra":
                setCities(["Pune", "Mumbai", "Nagpur"]);
                break;
            case "Goa":
                setCities(["South Goa", "North Goa", "Panaji"]);
                break;
            case "Gujrat":
                setCities(["Gandhinagar", "Ahemdabad", "Surat"]);
                break;
            default:
                setCities([]);
                break;
        }
    };

    // Show and hide password
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Navbar1></Navbar1>

            {/* Registration Section */}
            <div className="registration-container margin-10">
                {/* Left Container */}
                <div className="reg-left-container">
                    <h1 className="font-mont">Register to Join Our Platform Today!</h1>

                    <p className="mt-5">Stay informed and engaged with the democratic process by registering
                        to join our "Election Commission" platform! Our innovative service
                        offers real-time updates on election results, voter registration
                        assistance, and comprehensive information about candidates and their policies.
                    </p>
                    <p className="mt-3">Designed to empower citizens, our platform ensures that
                        your voice is heard and your vote counts. Register today to become
                        an active participant in shaping the future of your community and
                        country with the "Election Commission".
                    </p>

                    <img src={image} className="img-fluid" width="320px" alt="" />
                </div>

                {/* Right Container */}
                <div className="reg-right-container">
                    <h1 className="font-mont">Voter Registration</h1>

                    <form action="">
                        {/* Full Name */}
                        <div className="form-group mb-3">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" className="form-control" id="fullname" placeholder="Virat Sharma" />
                        </div>

                        {/* Date of Birth */}
                        <div className="form-group mb-3">
                            <label htmlFor="dob">Date Of Birth</label>
                            <input type="date" className="form-control" id="dob" value="2000-01-01" />
                        </div>

                        {/* Gender */}
                        <div class="form-group mb-3">
                            <label for="gender">Gender</label>
                            <select class="form-control" id="gender">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                            <i class="bi bi-arrow-down-square-fill form-icon"></i>
                        </div>

                        {/* Email */}
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="viratsharma@gmail.com" />
                        </div>

                        {/* Mobile No */}
                        <div className="form-group mb-3">
                            <label htmlFor="mobileno">Mobile No</label>
                            <input type="tel" className="form-control" id="mobileno" placeholder="9876543210" />
                        </div>

                        {/* State Dropdown */}
                        <div className="form-group mb-3">
                            <select
                                id="state"
                                class="form-control"
                                value={selectedState}
                                onChange={handleStateChange}
                            >
                                <option value="">Select State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujrat">Gujrat</option>
                            </select>
                            <i class="bi bi-arrow-down-square-fill form-icon2"></i>
                        </div>

                        {/* City Dropdown */}
                        <div className="form-group mb-3">
                            <select
                                id="city"
                                class="form-control"
                                disabled={cities.length === 0}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <i class="bi bi-arrow-down-square-fill form-icon2"></i>
                        </div>

                        {/* Password */}
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter Password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="password-toggle-btn"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Bottom Section */}
                        <button className="btn btn-blue col-12" type="button">Register</button>
                        <p className="mb-0 mt-1 text-center">Already have an account? <a href="">Login</a></p>
                    </form>
                </div>
            </div>
            
            <Footer1></Footer1>
        </div>
    )
}

export default VoterRegPage;