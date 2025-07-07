import Sidebar from "./components/sidebar";
import { SidebarProvider } from "./context/sidebarContext"
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import "./layout.css"

function Layout() {
  return (
    <SidebarProvider>
      <div className="app-layout">
        <Sidebar />

        <div className="main-area">
          <Header />
          <div className="main-content">
            <Outlet />
          </div>
        </div>

      </div>
    </SidebarProvider>
  );
}

export default Layout;
