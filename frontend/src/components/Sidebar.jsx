import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import axios from 'axios';

import SubMenu from './Submenu';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Sidebar = ({ isSidebarVisible }) => {
  const [sidebar, setSidebar] = useState(isSidebarVisible);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSidebar(isSidebarVisible);
  }, [isSidebarVisible]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (loadData.role === 'student') navigate('../student/login');
    else if (loadData.role === 'tpo_admin') navigate('../tpo/login');
    else if (loadData.role === 'management_admin') navigate('../management/login');
    else if (loadData.role === 'superuser') navigate('../admin');
  };

  const [loadData, setLoadData] = useState({
    name: 'Not Found',
    email: 'Not Found',
    profile: 'Profile Img',
    role: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setLoadData({
          name: `${res.data?.first_name} ${res.data?.middle_name} ${res.data?.last_name}`,
          email: res.data.email,
          profile: res.data.profile,
          role: res.data.role,
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          const dataToPass = {
            showToastPass: true,
            toastMessagePass: err.response.data.msg,
          };
          navigate('../', { state: dataToPass });
        }
      });
  }, [navigate]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [SidebarData, setSidebarData] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const fetchSidebarData = async () => {
    if (loadData.role === 'superuser') {
      const { SidebarData } = await import('./SuperUser/SidebarData');
      setSidebarData(SidebarData);
    } else if (loadData.role === 'management_admin') {
      const { SidebarData } = await import('./Management/SidebarData');
      setSidebarData(SidebarData);
    } else if (loadData.role === 'tpo_admin') {
      const { SidebarData } = await import('./TPO/SidebarData');
      setSidebarData(SidebarData);
    } else if (loadData.role === 'student') {
      const { SidebarData } = await import('./Students/SidebarData');
      setSidebarData(SidebarData);
    }
  };

  useEffect(() => {
    if (loadData.role) {
      fetchSidebarData();
    }
  }, [loadData.role]);


  return (
    <>
      <nav className={`bg-white border-r border-gray-200 w-[260px] h-screen z-30 flex flex-col fixed top-0 left-0 transition-transform duration-300 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Main Sidebar Logo and Name */}
        <div className="flex items-center px-6 py-5 gap-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <span className="text-white font-bold text-xl tracking-wider">CP</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {loadData.role === 'superuser' && <Link to="/admin/dashboard" className="no-underline text-gray-800">Portal</Link>}
            {loadData.role === 'management_admin' && <Link to="/management/dashboard" className="no-underline text-gray-800">Portal</Link>}
            {loadData.role === 'tpo_admin' && <Link to="/tpo/dashboard" className="no-underline text-gray-800">Portal</Link>}
            {loadData.role === 'student' && <Link to="/student/dashboard" className="no-underline text-gray-800">Portal</Link>}
          </h1>
        </div>

        {/* Main body */}
        <div className="flex-grow overflow-y-auto sidebar-content px-4 py-6">
          <div className="flex flex-col space-y-1">
            {SidebarData.length > 0 ? (
              SidebarData.map((item, index) => (
                <SubMenu item={item} key={index} currentPath={location.pathname} />
              ))
            ) : (
              <div className="flex justify-center space-x-2 animate-pulse mt-4">
                <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="border-t border-gray-200 p-4 relative">
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={`absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden transition-all duration-200 ${dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <div className="p-1">
              {['student', 'tpo_admin', 'management_admin'].includes(loadData.role) && (
                <Link to={`../${loadData.role === 'tpo_admin' ? 'tpo' : loadData.role.split('_')[0]}/account`} className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaCog className="text-gray-400" /> <span className="font-medium">Account Settings</span>
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                <FaSignOutAlt className="text-red-400" /> <span className="font-medium">Sign Out</span>
              </button>
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors" onClick={toggleDropdown}>
            <img src={loadData.profile} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 truncate">{loadData.name !== 'Not Found' ? loadData.name : 'Loading...'}</h2>
              <p className="text-xs text-gray-500 truncate capitalize">{loadData.role.replace('_', ' ')}</p>
            </div>
            <IoIosArrowDropdownCircle className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-blue-500' : 'rotate-0'}`} size={20} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
