// Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "./SidebarContext";
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
