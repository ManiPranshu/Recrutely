import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./register.css";

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="register-d">
      <header className="recrutely">
        <div className="text-wrapper">Recrutely</div>
      </header>

      <main className="reg-box">
        <h2 className="text-wrapper-8">Register</h2>

        <input className="input" placeholder="Full Name" type="text" />
        <input className="input" placeholder="Email Address" type="email" />
        <input className="input" placeholder="Password" type="password" />

        <div className="role-selection">
          <button
            className={`role-box ${selectedRole === "candidate" ? "active" : ""}`}
            onClick={() => handleRoleClick("candidate")}
            type="button"
          >
            Candidate
          </button>
          <button
            className={`role-box ${selectedRole === "employer" ? "active" : ""}`}
            onClick={() => handleRoleClick("employer")}
            type="button"
          >
            Employer
          </button>
        </div>

        <div className="register">
          <button className="register-btn">Register</button>
        </div>

        <div className="or-section">
          <span className="text-wrapper-9">or</span>
          <button className="google-img" type="button" />
        </div>

        <div className="tologin">
          <span className="text-wrapper-6">Already have an account?</span>
          <Link to='/login' className="text-wrapper-7">
          Log In
          </Link>
          {/* <span className="text-wrapper-7">Log In</span> */}
        </div>
      </main>
    </div>
  );
};
