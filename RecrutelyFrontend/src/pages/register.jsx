
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import google from "/assets/googlelogin.png";
import facebook from "/assets/facebook.png";
import { FaGoogle, FaFacebook } from "react-icons/fa";


function Rectangle() {
  return (
    <div className="rectr">
      <h1 className="headingr">Recrutely</h1>
    </div>
  );
}

function RegisterGrid() {
  const [selectedRole, setSelectedRole] = useState("");
  const [employerId, setEmployerId] = useState("");

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    if (role !== "employer") setEmployerId(""); // Clear ID if switching from employer
  };


  return (
    <div className="gridr">
      <h2 className="signinr">Register</h2>

      <input type="text" placeholder="Full Name" className="userinputr" />
      <input type="email" placeholder="Email Address" className="userinputr" />
      <input type="password" placeholder="Password" className="userinputr" />

      <div className="role-selectionr">
        <button
          className={`role-box ${selectedRole === "candidate" ? "active" : ""}`}
          onClick={() => handleRoleClick("candidate")}
        >
          Candidate
        </button>
        <button
          className={`role-box ${selectedRole === "employer" ? "active" : ""}`}
          onClick={() => handleRoleClick("employer")}
        >
          Employer
        </button>
      </div>
       {selectedRole === "employer" && (
        <input
          type="text"
          placeholder="Enter Employer ID"
          className="userinputr"
          value={employerId}
          onChange={(e) => setEmployerId(e.target.value)}
        />
      )}

      <button className="submitr">Register</button>

      <div className="dividerr">
        <span>or</span>
      </div>

      <button className="googler">

<FaGoogle style={{ color: "#DB4437" }} />
        <p>Continue With Google</p>
      </button>

      <button className="facebookr">

<FaFacebook style={{ color: "#1877F2" }} />
        <p>Continue With Facebook</p>
      </button>

      <div className="registerr">
        <span>Already have an account?</span>
        <Link to="/login" className="forgot-linkr">
          Log In
        </Link>
      </div>
    </div>
  );
}

export const Register = () => {
  return (
    <>
      <Rectangle />
      <RegisterGrid />
    </>
  );
};
