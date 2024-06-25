import "../../css/castVote.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";

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
      <Navbar1></Navbar1>
      <div className="main margin-10">
        <div className="upper">
          <h1 className="font-mont">Welcome Back!</h1>
          <img src={image} className="img-fluid" width="320px" alt="" />
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
                  <div className="left" style={{ flex: 1 }}>
                    <h1>Party:</h1>
                    <p>{userInfo.address}</p>
                  </div>
                  <div
                    className="right"
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src={image2}
                      alt="User Avatar"
                      className="user-avatar"
                    />
                  </div>
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
      <Footer1></Footer1>
      );
    </div>
  );
}

export default CastVote;
