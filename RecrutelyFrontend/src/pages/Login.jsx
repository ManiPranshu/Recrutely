import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import google from "/assets/googlelogin.png";
import facebook from "/assets/facebook.png";


function Rectangle() {
  return (
    <div className="rect">
      <h1 className="heading">Recrutely</h1>
    </div>
  );
}

function SignInGrid() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

     if (res.ok) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  setMessage("Login successful!");

  setTimeout(() => {
    if (data.user.role === "candidate") {
      navigate("/candidate/dashboard");
    } else if (data.user.role === "employer") {
      navigate("/employer/rdashboard");
    }
  }, 1000);
}
 else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="grid">
      <h2 className="signin">Sign-In</h2>

      <button className="google" onClick={() => {
    window.location.href = "http://localhost:3000/api/auth/google";
  }} >
        <img src={google} alt="google" style={{ height: "95%", width: "auto" }} />
        <p>Continue With Google</p>
      </button>

      <button className="facebook">
        <img src={facebook} alt="facebook" style={{ height: "60%", width: "auto" }} />
        <p>Continue With Facebook</p>
      </button>

      <div className="divider"><span>or</span></div>

      {/* ✅ Corrected: bind state here */}
      <input
        type="text"
        placeholder="Email"
        className="userinput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="userinput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link to="/forgot-password" className="forgot-link">
        Forgot password?
      </Link>

      <button className="submit" onClick={handleLogin}>
        Submit
      </button>

      {message && (
  <p
    style={{
      color: message.includes("successful") ? "green" : "red",
      marginTop: "10px",
    }}
  >
    {message}
  </p>
)}


      <div className="register">
        <span>Don't have an account?</span>
        <Link to="/Register" className="forgot-link">
          Register
        </Link>
      </div>
    </div>
  );
}

function Login() {
  return (
    <>
      <Rectangle />
      <SignInGrid />
    </>
  );
}

export default Login;
