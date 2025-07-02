// import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Register} from './pages/register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/dashboard.jsx';

function App(){
  return(
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />

      </Routes>
    </Router>
    </>
  )
}

export default App;

// import React, { useState } from 'react';
// import Header from './pages/Header.jsx';
// import Sidebar from './pages/sidebar.jsx';
// import MainContent from './pages/Maincontent.jsx';
// import './pages/style.css';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//       <Sidebar isOpen={isSidebarOpen} />
//       <div className="main-area">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//         <MainContent/>
//       </div>
      
//     </div>
//   );
// }

// export default App;




