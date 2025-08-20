import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // You can decode the token here if needed to get role etc.
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Redirecting...</p>;
}

export default OAuthSuccess;
