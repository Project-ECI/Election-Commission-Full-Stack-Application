import image from "../../assets/images/image-for-loginpage.png"

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import React, { useEffect, useState } from "react";
import PartySidebar from "../../components/PartySidebar.jsx";

import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";

function PartyProfile() {
    // State and cities dropdown
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [districtId, setDistrictId] = useState("");

    useEffect(() => {
        // Fetch state data from the backend when the component mounts
        const fetchStates = async () => {
            try {
                const response = await getAllStates();
                setStates(response.data); // Update state with fetched data
            } catch (err) {
                console.error("Failed to fetch states:", err);
            }
        };

        fetchStates();
    }, []);

    const handleStateChange = async (e) => {
        const selectedState = e.target.value;
        setSelectedState(selectedState);
        const response = await getRespectiveDistrict(selectedState);
        if (response.data.length === 0) {
            alert("no city found");
        } else setCities(response.data);
    };

    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <PartySidebar />

                <div className="right-homepage-container">
                    <div className="registration-container">
                        <div className="reg-left-container">
                            {/* <h1 className="font-mont" style={{color:"white"}}>Update Voter Profile</h1> */}
                            <img src={image} className="img-fluid" width="320px" alt="" />
                        </div>

                        <div className="reg-right-container">
                            <h1 className="font-mont">Update Party Profile</h1>

                            <form>
                                {/* Party Name */}
                                <div className="form-group mb-3">
                                    <label htmlFor="party-name">Party Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="party-name"
                                        value="Bharatiya Janta Party"
                                        disabled
                                    />
                                </div>

                                {/* Objective*/}
                                <div className="form-group mb-3">
                                    <label htmlFor="objective">Party Objective</label>
                                    <textarea
                                        className="form-control"
                                        id="party-objective"
                                        rows="3"
                                        value="The NDA's campaign was based on the slogan 'India Shining', which sought to depict it as responsible for a rapid economic transformation of the country."
                                        disabled
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value="bjp.support@gmail.com"
                                        disabled
                                    />
                                </div>

                                {/* State */}
                                <div className="form-group mb-3">
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        value="Maharastra"
                                        disabled
                                    />
                                </div>

                                {/* District */}
                                <div className="form-group mb-3">
                                    <label htmlFor="state">District</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="district"
                                        value="Gadchiroli"
                                        disabled
                                    />
                                </div>


                                <button className="btn btn-blue col-12" type="button">
                                    Edit Profile
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Editable From */}
                    <div className="registration-container">
                        <div className="reg-left-container">
                            {/* <h1 className="font-mont" style={{color:"white"}}>Update Voter Profile</h1> */}
                            <img src={image} className="img-fluid" width="320px" alt="" />
                        </div>

                        <div className="reg-right-container">
                            <h1 className="font-mont">Update Party Profile</h1>

                            <form className="editable-form">
                                {/* Party Name */}
                                <div className="form-group mb-3">
                                    <label htmlFor="party-name">Party Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="party-name"
                                        value="Bharatiya Janta Party"
                                    />
                                </div>

                                {/* Objective*/}
                                <div className="form-group mb-3">
                                    <label htmlFor="objective">Party Objective</label>
                                    <textarea
                                        className="form-control"
                                        id="party-objective"
                                        rows="3"
                                        value="The NDA's campaign was based on the slogan 'India Shining', which sought to depict it as responsible for a rapid economic transformation of the country."
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value="bjp.support@gmail.com"
                                    />
                                </div>

                                {/* State Dropdown */}
                                <div className="form-group mb-3">
                                    <select
                                        id="state"
                                        className="form-control"
                                        value={selectedState}
                                        onChange={handleStateChange}
                                    >
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option value={state.stateId}>{state.stateName}</option>
                                        ))}
                                    </select>

                                    <i className="bi bi-arrow-down-square-fill form-icon2"></i>
                                </div>

                                {/* City Dropdown */}
                                <div className="form-group mb-3">
                                    <select
                                        id="city"
                                        className="form-control"
                                        disabled={cities.length === 0}
                                        onChange={(e) => setDistrictId(e.target.value)}
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option value={city.districtId}>{city.districtName}</option>
                                        ))}
                                    </select>
                                    <i className="bi bi-arrow-down-square-fill form-icon2"></i>
                                </div>

                                <div className="editable-form-buttons">
                                    <button className="btn btn-success" type="button">
                                        Update Profile
                                    </button>

                                    <button className="btn btn-danger" type="button">
                                        Cancel
                                    </button>
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

export default PartyProfile;