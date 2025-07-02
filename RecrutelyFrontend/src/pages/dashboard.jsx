import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './sidebar.jsx';
import MainContent from './Maincontent';
import './style.css';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-area">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent/>
      </div>
      
    </div>
  );
}

export default Dashboard;


