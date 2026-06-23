import React from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/NotificationBox';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { name: 'Computer', Placed: 120, Unplaced: 10 },
  { name: 'ECS', Placed: 95, Unplaced: 25 },
  { name: 'AIDS', Placed: 80, Unplaced: 15 },
  { name: 'Mechanical', Placed: 40, Unplaced: 50 },
  { name: 'Civil', Placed: 30, Unplaced: 60 }
];

function Home() {
  document.title = 'CPMS | Management Dashboard';
  return (
    <>
      <div className="mb-8 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Real-Time Placement Analytics</h2>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f4f4f4' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Placed" stackId="a" fill="#004080" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Unplaced" stackId="a" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationBox />
        <NoticeBox />
      </div>
    </>
  )
}

export default Home
