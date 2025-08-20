import { Navigate } from "react-router-dom";

const CandidateProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  let role = null; // <-- declare role variable

  if (userString) {
    const user = JSON.parse(userString);
    role = user.role; // <-- set role
    console.log("Role is:", role);
  } else {
    console.log("No user found in localStorage");
  }

  if (!token || role !== "candidate") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CandidateProtectedRoute;
