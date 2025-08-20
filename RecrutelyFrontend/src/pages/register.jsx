
import { useNavigate } from "react-router-dom"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";





function Rectangle() {
  return (
    <div className="rectr">
      <h1 className="headingr">Recrutely</h1>
    </div>
  );
}

function RegisterGrid() {

  const navigate = useNavigate(); // inside the function RegisterGrid

  const [selectedRole, setSelectedRole] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    if (role !== "employer") setEmployerId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const bodyData = {
      fullName,
      email,
      password,
      role: selectedRole,
    };
    if (selectedRole === "employer") {
      bodyData.employerId = employerId;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });


      const data = await res.json();

       if (res.ok) {
        setMessage("Registration successful! Please log in.");
        // Clear fields
        setFullName("");
        setEmail("");
        setPassword("");
        setSelectedRole("");
        setEmployerId("");

        setTimeout(() => {
    navigate("/login");
  }, 500);

      }
      else {
        setMessage(data.message || data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("Server error. Please try again.");
    }
  };

  const isFormValid =
    fullName &&
    email &&
    password &&
    selectedRole &&
    (selectedRole !== "employer" || employerId);

  return (
    <div className="gridr">
      <h2 className="signinr">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="userinputr"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        className="userinputr"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="userinputr"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="role-selectionr">
        <button
          type="button"
          className={`role-box ${selectedRole === "candidate" ? "active" : ""}`}
          onClick={() => handleRoleClick("candidate")}
        >
          Candidate
        </button>
        <button
          type="button"
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

      <button
        className="submitr"
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        Register
      </button>

      {message && (
        <div
          style={{
            color: message.toLowerCase().includes("successful")
              ? "green"
              : "red",
            marginTop: 10,
          }}
        >
          {message}
        </div>
      )}

      <div className="dividerr">
        <span>or</span>
      </div>

      <button className="googler" onClick={() => {
    window.location.href = "http://localhost:5050/api/auth/google";
  }}>
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
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Register.css";
// import { FaGoogle, FaFacebook } from "react-icons/fa";

// export const Register = () => {
//   const [selectedRole, setSelectedRole] = useState("");
//   const [employerId, setEmployerId] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       const res = await fetch("http://localhost:5050/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullName,
//           email,
//           password,
//           role: selectedRole,
//           employerId: selectedRole === "employer" ? employerId : undefined,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("✅ Registration successful!");
//       } else {
//         setMessage(data.message || "❌ Registration failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Server error");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h1>Recrutely</h1>
//       <form onSubmit={handleSubmit}>
//         <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" required />
//         <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
//         <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />

//         <div>
//           <button type="button" onClick={() => setSelectedRole("candidate")} className={selectedRole === "candidate" ? "active" : ""}>Candidate</button>
//           <button type="button" onClick={() => setSelectedRole("employer")} className={selectedRole === "employer" ? "active" : ""}>Employer</button>
//         </div>

//         {selectedRole === "employer" && (
//           <input value={employerId} onChange={(e) => setEmployerId(e.target.value)} placeholder="Employer ID" />
//         )}

//         <button type="submit">Register</button>
//         {message && <div>{message}</div>}
//       </form>
//     </div>
//   );
// };
