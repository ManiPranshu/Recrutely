// Layout.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useSidebar } from "./context/SidebarContext";
import "./Layout.css"; 

const Layout = ({ children }) => {
  const { isSidebarOpen } = useSidebar();

  return (
  <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
  <Sidebar />
  <div className="main-area">
    <Header />
    <div className="page-content">{children}</div>
  </div>
</div>

  );
};

export default Layout;
