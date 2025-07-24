import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/candidate/dashboard";
import ProfilePage from "./pages/candidate/ProfilePage";
import { Register } from "./pages/register";
import { SidebarProvider } from "./context/SidebarContext";
import Layout from "./Layout";
import Login from "./pages/Login";
import ViewApplicants from "./pages/recruiter/ViewApplicants";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import JobBoard from "./pages/candidate/JobBoard";
import Applications from "./pages/candidate/Application";
import JobDescription from "./pages/candidate/JobDescription";
import JobListing from "./pages/recruiter/JobListing";
import PostJob from "./pages/recruiter/postjob";
import Home from "./pages/Home";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <SidebarProvider>
              <Layout>
                <Routes>
                  <Route path="/jobs" element={<JobBoard />} />
                  <Route path="/rdashboard" element={<RecruiterDashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/applicants" element={<ViewApplicants />} />
                  <Route path="/application" element={<Applications />} />
                  {/* <Route path="/jobdesc" element={<JobDescription />} /> */}
                  <Route path="/jobdesc/:id" element={<JobDescription />} />

                  <Route path = "/rprofile" element={<RecruiterProfile />} />
                  <Route path="/joblisting" element={<JobListing />} />
                  <Route path="/postjob" element={<PostJob />} />
                  <Route path="/postjob/:id" element={<PostJob />} /> {/* ← For editing */}

                </Routes>
              </Layout>
            </SidebarProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
