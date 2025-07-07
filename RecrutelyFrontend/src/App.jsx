import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ProfilePage from "./pages/ProfilePage";
import { Register } from "./pages/register";
import { SidebarProvider } from "./pages/SidebarContext";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import ViewApplicants from "./pages/ViewApplicants";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobBoard from "./pages/JobBoard";
import Applications from "./pages/Application";
import JobDescription from "./pages/JobDescription";

function App() {
  return (
    <Router>
      <Routes>


        <Route path="/register" element={<Register />} />
        <Route path ="/login" element={<Login/>}/>

        <Route
          path="/*"
          element={
            <SidebarProvider>
              <Layout>
                <Routes>
                  <Route path="/jobs" element={<JobBoard/>} />
                  <Route path="/rdashboard" element={<RecruiterDashboard/>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                 < Route path="/applicants" element={< ViewApplicants/>}/>
                 < Route path="/application" element={< Applications/>}/>
                 < Route path="/jobdesc" element={< JobDescription/>}/>



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
