import MainContent from './MainContent';
import './styles.css';


import React, { useState } from "react";
import './MainContent.css'; 
import Applications from "./Application.jsx"; 
import docIcon from "/assets/application.png";        
import rejectedIcon from "/assets/totaljob.png"; 
import shortlistedIcon from "/assets/shortlist.png"; 
import {Link} from "react-router-dom";





function Dashboard() {

 

  return (
   
        <MainContent/>
     
  );
}

export default Dashboard;


