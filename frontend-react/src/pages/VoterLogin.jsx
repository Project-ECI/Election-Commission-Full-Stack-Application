import Footer1 from "../components/Footer1.jsx";
import Navbar1 from "../components/Navbar1.jsx";
import main_image from "../assets/images/image-for-loginpage.png";

function VoterLogin() {
  return (
    <div>
      <Navbar1></Navbar1>

      {/* login  */}
      <div className="container voter-registraion">
        <div className="left-voter-registraion col">
          <h1 className="voter-heading font-mont ">Welcome Back!</h1>
          <img src={main_image} alt="" className="img-fluid" width="320px" />
        </div>

        <div className="right-voter-registraion  col-md-6">
          <div className="form">
            <p className="voter-heading">Voter Login</p>

            <div className="form-group child-div">
              <label for="email">Email or VoterID</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="userid"
                aria-describedby="emailHelp"
                placeholder="Enter Emial or VoterId"
              ></input>
            </div>

            <div className="form-group child-div">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                placeholder="Password"
              ></input>
            </div>

            <div className="child-div">
              <label for="not have acc">
                Not have an account?<a href=".">Register</a>
              </label>
            </div>

            <div className="form-group child-div">
              <button type="submit" className="btn btn-blue col-12 ">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="col-12">
        <Footer1></Footer1>
      </div>
    </div>
  );
}

export default VoterLogin;
