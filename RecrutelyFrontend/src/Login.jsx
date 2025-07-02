import React from "react";
import { useState} from "react";
import {Link} from "react-router-dom"
import "./Login.css"
import google from "./assets/google.png"
import facebook from "./assets/facebook.png"

function Rectangle(){
  return(
    <div className="rect">
       <h1 className="heading">Recrutely</h1>
       </div>
  )
}

function SignInGrid(){
  return(
    <div className="grid">
      <h2 className="signin">Sign-In</h2>

      <div className="google">
        <img src={google} alt="google image" style={{height:"95%", width: "auto"}} />
        <p>Continue With Google</p>
      </div>

      <div className="facebook">
        <img src={facebook} alt="facebook image" style={{height:"60%", width: "auto"}} />
        <p>Continue With Facebook</p>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <input type="text" placeholder="Email or Phone" className="userinput"/>
      <input type="password" placeholder="Password" className="userinput"/>
      <Link to="/forgot-password" className="forgot-link">
        Forgot password?
      </Link>
      <button className="submit">Submit</button>
      <div className="register">
        <span>Don't have an account?</span>
        <Link to="/Register" className="forgot-link">
        Register
        </Link>
      </div>
    </div>
  )
}
function Login(){
  const [username,setUsername] = useState(0);
  return(
    <>
      <Rectangle />
      <SignInGrid />
    </>
  )
}

export default Login;