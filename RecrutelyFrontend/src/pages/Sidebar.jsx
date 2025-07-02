import React from 'react';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
     
          
      <ul>

        <li>Dashboard</li>
        <li>Profile</li>
        <li>Applications</li>
        <li>Jobs</li>
      </ul>
    </aside>
  );
};

export default Sidebar;

