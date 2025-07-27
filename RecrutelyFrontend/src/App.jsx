import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import {Layout, ELayout} from "./Layout";

import { Register } from "./pages/register";
import Login from "./pages/Login";
import { SidebarProvider } from "./context/SidebarContext";
import { EmployerSidebarProvider } from "./context/EmployerSidebarContext";


import Dashboard from "./pages/candidate/dashboard";
import ProfilePage from "./pages/candidate/ProfilePage";
import JobBoard from "./pages/candidate/JobBoard";
import Applications from "./pages/candidate/Application";
import JobDescription from "./pages/candidate/JobDescription";

import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import ViewApplicants from "./pages/recruiter/ViewApplicants";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import JobListing from "./pages/recruiter/JobListing";
import PostJob from "./pages/recruiter/postjob";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/candidate/*"
          element={
            <SidebarProvider>
              <Layout>
                <Routes>
                  <Route path="/jobs" element={<JobBoard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/application" element={<Applications />} />
                  <Route path="/jobdesc/:id" element={<JobDescription />} />

                

                </Routes>
              </Layout>
            </SidebarProvider>
          }
        />


           <Route
          path="/employer/*"
          element={
            <EmployerSidebarProvider>
              <ELayout>
                <Routes>

                  <Route path="/rdashboard" element={<RecruiterDashboard />} />
                  <Route path="/applicants" element={<ViewApplicants />} />
                  <Route path = "/rprofile" element={<RecruiterProfile />} />
                  <Route path="/joblisting" element={<JobListing />} />
                  <Route path="/postjob" element={<PostJob />} />
                  <Route path="/postjob/:id" element={<PostJob />} /> 

                </Routes>
              </ELayout>
            </EmployerSidebarProvider>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
