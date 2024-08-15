import image from "../../assets/images/image-for-loginpage.png"

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar.jsx";

function AdminProfile() {
    return (
        <React.Fragment>
            <Navbar3 />

            <div className="homepage-container">
                <AdminSidebar />

                <div className="right-homepage-container">
                    <div className="registration-container">
                        <div className="reg-left-container">
                            {/* <h1 className="font-mont" style={{color:"white"}}>Update Voter Profile</h1> */}
                            <img src={image} className="img-fluid" width="320px" alt="" />
                        </div>

                        <div className="reg-right-container">
                            <h1 className="font-mont">Admin Profile</h1>

                            <form>
                                {/* Full Name */}
                                <div className="form-group mb-3">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        value="Narendra Modi"
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
                                        value="admin.name@gmail.com"
                                        disabled
                                    />
                                </div>

                                <div class="alert alert-warning" role="alert">
                                    Once a admin profile is created, it cannot be updated.
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

export default AdminProfile;