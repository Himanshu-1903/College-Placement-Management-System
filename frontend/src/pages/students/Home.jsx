import React from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/Students/NotificationBox';

// student
function Home() {
  // Set the page title
  document.title = 'IIIT Allahabad Placement Portal | IIIT Student Placement Dashboard';

  return (
    <>
      <div className="mb-8 p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Welcome back!</h1>
          <p className="text-blue-100 text-lg">Your placement journey starts here. Stay updated with the latest notices and job listings.</p>
        </div>
        <div className="absolute right-0 top-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>
        </div>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
        <NotificationBox />
        <NoticeBox />
      </div>
    </>
  );
}

export default Home
