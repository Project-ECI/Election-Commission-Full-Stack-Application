import image from "../../assets/images/image-for-registrationpage.png";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useState } from "react";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/admin.service.js";
import { Button, Modal } from "react-bootstrap";

function CandidateSettings() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [candidateId, setCandidateId] = useState("");

  const handleDelete = async () => {
    const id = sessionStorage.getItem("id");
    setCandidateId(id);
    try {
      const response = await adminService.deleteCandidate(candidateId);
      if (response.data === "success") {
        alert("Account deleted successfully.");
        navigate("/candidate/login");
      } else {
        alert("Failed to delete account.");
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
                  <button className="btn btn-blue col-12" type="button">
                    Enable 2FA
                  </button>
                </div>

                <div className="form-group mb-3">
                  <button
                    style={{ height: "40px" }}
                    className="btn btn-primary col-12"
                    type="button"
                    disabled
                  >
                    Change Password
                  </button>
                  <small id="passwordHelp" class="form-text text-muted">
                    Please update the password through the Voter profile.
                  </small>
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
              </form>
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

export default CandidateSettings;
