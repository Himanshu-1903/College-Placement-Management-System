// Navbar.jsx
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Navbar({ isSidebarVisible, toggleSidebar }) {
  const location = useLocation();

  // Page name extraction and formatting
  let pageName = location.pathname.split('/').filter(Boolean).pop();
  if (pageName === 'dashboard') pageName = "home";
  if (pageName === 'tpo') pageName = "TPO";
  pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="h-16 sticky top-0 z-10 bg-white/80 backdrop-blur-md flex justify-between items-center border-b border-gray-200 px-6 transition-all">
      <div className="flex items-center">
        <button className="mr-4 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          {pageName}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Placeholder for future global search or notification icon */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer text-gray-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
