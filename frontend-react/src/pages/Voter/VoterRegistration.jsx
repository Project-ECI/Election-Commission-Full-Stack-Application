import "../../css/registration.css";
import Navbar2 from "../../components/Navbar2.jsx";
import Footer1 from "../../components/Footer1";
import image from "../../assets/images/image-for-registrationpage.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";
import voterService from "../../services/voter.service";
import { toast } from "react-toastify";

function VoterRegPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // State management for states and cities
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch all states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getAllStates();
        setStates(response.data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };
    fetchStates();
  }, []);

  // Fetch respective districts when the state changes
  const handleStateChange = useCallback(async (e) => {
    const stateId = e.target.value;
    const response = await getRespectiveDistrict(stateId);
    setCities(response.data.length ? response.data : []);
  }, []);

  // Password toggle
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      const response = await voterService.register(data);
      if (response.data === "success") {
        toast.success("Registration Successful");
        navigate("/voter/login");
      } else if (response.data === "fail") {
        toast.info("Email is already taken. Please try another.");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="registration-container margin-10">
        <div className="reg-left-container">
          <h1>Register to Join Our Platform Today!</h1>
          <p>
            Stay informed and engaged with the democratic process by registering
            to join our "Election Commission" platform!
          </p>
          <img src={image} className="img-fluid" width="320px" alt="Registration" />
        </div>
        <div className="reg-right-container">
          <h1>Voter Registration</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="form-group mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.fullName && "is-invalid"}`}
                placeholder="Enter Full Name"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}
            </div>

            {/* Date of Birth */}
            <div className="form-group mb-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className={`form-control ${errors.dob && "is-invalid"}`}
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const minDate = new Date();
                    minDate.setFullYear(minDate.getFullYear() - 18);
                    return selectedDate <= minDate || "You must be at least 18 years old";
                  }
                })}
              />
              {errors.dob && <p className="error-text">{errors.dob.message}</p>}
            </div>

            {/* Gender */}
            <div className="form-group mb-3">
              <label>Gender</label>
              <select
                className="form-control"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender.message}</p>}
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            {/* Mobile No */}
            <div className="form-group mb-3">
              <label>Mobile No</label>
              <input
                type="tel"
                className={`form-control ${errors.mobileNo && "is-invalid"}`}
                placeholder="Enter Mobile Number"
                {...register("mobileNo", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit mobile number"
                  }
                })}
              />
              {errors.mobileNo && <p className="error-text">{errors.mobileNo.message}</p>}
            </div>

            {/* State Dropdown */}
            <div className="form-group mb-3">
              <select
                className="form-control"
                {...register("stateId", { required: "State is required" })}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.stateName}
                  </option>
                ))}
              </select>
              {errors.stateId && <p className="error-text">{errors.stateId.message}</p>}
            </div>

            {/* City Dropdown */}
            <div className="form-group mb-3">
              <select
                className="form-control"
                disabled={cities.length === 0}
                {...register("districtId", { required: "City is required" })}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.districtId} value={city.districtId}>
                    {city.districtName}
                  </option>
                ))}
              </select>
              {errors.districtId && <p className="error-text">{errors.districtId.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password && "is-invalid"}`}
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button className="btn btn-blue col-12" type="submit">
              Register
            </button>
            <p className="mb-0 mt-1 text-center">
              Already have an account? <Link className="blue-link" to="/voter/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default VoterRegPage;
