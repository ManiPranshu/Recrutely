// Layout.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EHeader from "./components/EHeader";
import EmployerSidebar from "./components/EmployerSidebar";
import { useSidebar } from "./context/SidebarContext";
import { useEmployerSidebar } from "./context/EmployerSidebarContext";
import "./Layout.css"; 

export const Layout = ({ children }) => {
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

export const ELayout = ({ children }) => {
  const { isSidebarOpen } = useEmployerSidebar();

  return (
  <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
  <EmployerSidebar />
  <div className="main-area">
    <EHeader />
    <div className="page-content">{children}</div>
  </div>
</div>

  );
};


