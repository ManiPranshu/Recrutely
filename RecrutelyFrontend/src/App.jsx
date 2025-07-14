// import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Register} from './pages/register.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/candidate/profile.jsx'
// import Sidebar from './components/sidebar.jsx'
import Layout from './layout.jsx'
import JobListing from './pages/recruiter/joblisting.jsx'
import PostJob from './pages/recruiter/postjob.jsx'

function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<PostJob />} />
            <Route path="/application" element={<dashboard />} />
            <Route path="/job" element={<JobListing />} />
          </Route>
       </Routes>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;

