import image from "../../assets/images/image-for-registrationpage.png";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar.jsx";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/admin.service.js";
import { Button, Modal } from "react-bootstrap";

function AdminSettings() {
  const navigate = useNavigate();
  // Show and hide password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [toggle, setToggle] = useState(false);
  // For dto
  const [adminId, setAdminId] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const dto = {
    adminId,
    oldPassword,
    newPassword,
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const onClickChangePass = () => {
    setToggle(!toggle);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    const id = sessionStorage.getItem("id");
    setAdminId(id);
    try {
      const response = await adminService.changePass(dto);
      if (response.data === "success") {
        toast.success("Password Change Successfully");
        navigate("/voter/settings");
        setOldPassword("");
        setNewPassword("");
        setToggle(!toggle);
      } else {
        toast.error("Fail");
        navigate("/voter/settings");
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleDelete = async () => {
    const id = sessionStorage.getItem("id");
    setAdminId(id);
    try {
      const response = await adminService.deleteAdmin(id);
      if (response.data === "success") {
        toast.error("Account deleted successfully.");
        navigate("/admin/login");
      } else {
        toast.error("Failed to delete account.");
      }
    } catch (e) {
      alert(e);
    }
    setShowModal(false); // Close the modal after deletion
  };

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <AdminSidebar />

        <div className="right-homepage-container">
          <div className="registration-container">
            <div className="reg-left-container">
              <img src={image} className="img-fluid" width="320px" alt="" />
            </div>

            <div className="reg-right-container">
              <h1 className="font-mont">Account Settings</h1>

              <div className="form-group mb-3">
                <Button variant="primary" className="btn-blue col-12">
                  Enable 2FA
                </Button>
              </div>

              <div className="form-group mb-3">
                <Button
                  variant="primary"
                  className="btn-blue col-12"
                  onClick={onClickChangePass}
                >
                  Change Password
                </Button>
              </div>

              <div className="form-group mb-3">
                <Button
                  variant="danger"
                  className="btn-danger col-12"
                  onClick={() => setShowModal(true)} // Show modal on delete click
                >
                  Delete Account
                </Button>
              </div>

              {toggle && (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="old-password">Old Password</label>
                    <div className="password-input-container">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        id="old-password"
                        value={oldPassword}
                        className="form-control"
                        placeholder="Enter Old Password"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={toggleOldPasswordVisibility}
                        className="password-toggle-btn"
                      >
                        {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="new-password">New Password</label>
                    <div className="password-input-container">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="new-password"
                        value={newPassword}
                        className="form-control"
                        placeholder="Enter New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="password-toggle-btn"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-success col-12" type="submit">
                    Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Delete Account */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="exampleModalCenterTitle"
      >
        <Modal.Header closeButton>
          <Modal.Title id="exampleModalCenterTitle">Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer1 />
    </React.Fragment>
  );
}

export default AdminSettings;
