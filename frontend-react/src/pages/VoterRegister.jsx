import Footer1 from "../components/Footer1";
import Navbar1 from "../components/Navbar1";
import Dropdown from "../components/stateDropdown.jsx";
import DisDropdown from "../components/districtDropdown.jsx";
import regitration from "../assets/images/image-for-registrationpage.png";

function VoterRegister() {
  return (
    <div>
      <Navbar1></Navbar1>

      {/* Registration  */}
      <div className="container voter-registraion ">
        <div className="left-voter-registraion col">
          <h1 className="voter-heading font-mont">
            Register to Join Our Platform Today!
          </h1>
          <p className="voter-subheading ">
            Stay informed and engaged with the democratic process by registering
            to join our "Election Commission" platform! Our innovative service
            offers real-time updates on election results, voter registration
            assistance, and comprehensive information about candidates and their
            policies. Designed to empower citizens, our platform ensures N that
            your voice is heard and your vote counts. Register today to become
            an active participant in shaping the future of your community and
            country with the "Election Commission"
          </p>
          <img src={regitration} alt="" className="img-fluid" width="320px" />
        </div>

        <div className="right-voter-registraion  col-md-7">
          <div className=" ">
            <p className="voter-heading">Voter Registration</p>

            <div className="form padding-10">
              <div class="form-group child-div">
                <label for="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  aria-describedby="namelHelp"
                  placeholder="Enter full Name"
                ></input>
              </div>

              <div className="form-group child-div">
                <label for="DOB">Date of Birth</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="dob"
                  aria-describedby="dobHelp"
                ></input>
              </div>

              <label for="gender">Gender</label>
              <div className="form-group ">
                <label>
                  <input
                    type="radio"
                    className=" form-control-lg "
                    name="gender"
                    value="male"
                  ></input>
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    className=" form-control-lg"
                    name="gender"
                    value="female"
                  ></input>
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    className="form-control-lg"
                    name="gender"
                    value="other"
                  ></input>
                  Other
                </label>
              </div>

              <div className="form-group child-div">
                <label for="email">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                ></input>
              </div>
              <div className="form-group child-div">
                <label for="mobile">Mobile</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="mobile"
                  aria-describedby="mobileHelp"
                  placeholder="Enter Mobile Number"
                ></input>
              </div>
              <div className="form-group child-div">
                <label for="state">State</label>
                <Dropdown />
              </div>
              <div className="form-group child-div">
                <label for="District">District</label>
                <DisDropdown />
              </div>
              <div className="form-group child-div">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
                ></input>
              </div>
              <div className="child-div">
                <label for="already acc">
                  Already have an account?<a href=".">Login</a>
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
      </div>

      {/* Footer */}
      <div className="col-12">
        <Footer1></Footer1>
      </div>
    </div>
  );
}

export default VoterRegister;
