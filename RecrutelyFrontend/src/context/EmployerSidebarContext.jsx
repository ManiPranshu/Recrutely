import { createContext, useContext, useState } from "react";

const EmployerSidebarContext = createContext();

export const useEmployerSidebar = () => useContext(EmployerSidebarContext);

export const EmployerSidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <EmployerSidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </EmployerSidebarContext.Provider>
  );
};