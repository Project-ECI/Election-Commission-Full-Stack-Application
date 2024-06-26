import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
import Sidebar from "../../components/Sidebar.jsx";

import image from "../../assets/images/image-for-loginpage.png";
import image1 from "../../assets/images/virat.png";
import image2 from "../../assets/images/download.png";

function CastVote() {
  const userInfo = {
    name: "Virat",
    address: "Party Name",
    avatar: image1, // Replace with actual path to user's image
  };
  return (
    <div>
      <Navbar3></Navbar3>

      <div className="homepage-container">
        <Sidebar></Sidebar>
        <div className="right-homepage-container">
          <div className="upper">
            <h2 className="heading">Welcome</h2>
            <img src={image} className="img-fluid" width="200px" alt="" />
          </div>
          <div className="lower">
            <div className="content">
              <div className="left">
                <div className="id-card">
                  <div className="id-header">
                    <img
                      src={userInfo.avatar}
                      alt="User Avatar"
                      className="user-avatar"
                    />
                    <h2>{userInfo.name}</h2>
                  </div>
                  <div className="id-body" style={{ display: "flex" }}>
                    <div className="rightdiv">
                      <h3>Party :</h3>
                      <h2>{userInfo.address}</h2>
                    </div>
                    <img
                      src={image2}
                      alt="User Avatar"
                      className="user-avatar"
                      style={{ marginRight: "50px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="card-checkbox"
                    className="custom-checkbox"
                    style={{
                      scale: "3",
                    }}
                  />
                </div>
              </div>
            </div>
            <botton className="btn btn-blue margintop">Submit Vote</botton>
          </div>
        </div>
      </div>

      <Footer1></Footer1>
    </div>
  );
}

export default CastVote;
