
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/dashboard';
import ProfilePage from './pages/ProfilePage';
import {Register} from './pages/register';
import { SidebarProvider } from "./pages/SidebarContext";
import Layout from './pages/Layout';



function App(){
  return(
    <>
      <Router>
      <SidebarProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/apply" element={<Register />} />

          </Routes>
        </Layout>
      </SidebarProvider>
    </Router>
    </>
  )
}

export default App;