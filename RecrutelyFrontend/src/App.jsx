import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HeroBanner from "./components/HeroBanner";
import {Layout, ELayout} from "./Layout";

import { Register } from "./pages/register";
import Login from "./pages/login";
import ProtectedRoute from "./pages/protectedRoute";
import { SidebarProvider } from "./context/SidebarContext";
import { EmployerSidebarProvider } from "./context/EmployerSidebarContext";

import ProfilePage from "./pages/candidate/ProfilePage";
import Applications from "./pages/candidate/Application";
import Dashboard from "./pages/candidate/dashboard";
import JobDescription from "./pages/candidate/JobDescription";
import JobBoard from "./pages/candidate/JobBoard";

import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import ViewApplicants from "./pages/recruiter/ViewApplicants";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import JobListing from "./pages/recruiter/joblisting";
import PostJob from "./pages/recruiter/postjob";


import CandidateProtectedRoute from "./pages/CandidateProtectedRoute";
import RecruiterProtectedRoute from "./pages/RecruiterProtectedRoute";




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HeroBanner />} />


         <Route path="/employer/*"
  element={
    <EmployerSidebarProvider>
      <ELayout>
        <Routes>
          <Route path="/rdashboard" element={<RecruiterProtectedRoute><RecruiterDashboard /></RecruiterProtectedRoute>} />
          <Route path="/rprofile" element={<RecruiterProtectedRoute><RecruiterProfile /></RecruiterProtectedRoute>} />
          <Route path="/postjob" element={<RecruiterProtectedRoute><PostJob /></RecruiterProtectedRoute>} />
          <Route path="/postjob/:id" element={<RecruiterProtectedRoute><PostJob /></RecruiterProtectedRoute>} />
          <Route path="/joblisting" element={<RecruiterProtectedRoute><JobListing /></RecruiterProtectedRoute>} />
          <Route path="/applicants" element={<RecruiterProtectedRoute><ViewApplicants /></RecruiterProtectedRoute>} />
          <Route path="/applicants/:jobId" element={<RecruiterProtectedRoute><ViewApplicants /></RecruiterProtectedRoute>} />
        </Routes>
      </ELayout>
    </EmployerSidebarProvider>
  }
/>


          <Route path="/candidate/*"
  element={
    <SidebarProvider>
      <Layout>
        <Routes>
          <Route path="/jobs" element={<CandidateProtectedRoute><JobBoard /></CandidateProtectedRoute>} />
          <Route path="/jobdesc/:id" element={<CandidateProtectedRoute><JobDescription /></CandidateProtectedRoute>} />
          <Route path="/application" element={<CandidateProtectedRoute><Applications /></CandidateProtectedRoute>} />
          <Route path="/dashboard" element={<CandidateProtectedRoute><Dashboard /></CandidateProtectedRoute>} />
          <Route path="/profile" element={<CandidateProtectedRoute><ProfilePage /></CandidateProtectedRoute>} />
        </Routes>
      </Layout>
    </SidebarProvider>
  }
/>

         
        </Routes>
      </Router>
    </>
  );
}

export default App;
