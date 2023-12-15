import React from 'react';
import EmergencyContactGrid from '../components/EmergencyContactsGrid';
import BloodSugarGraph from '../components/BloodSugarGraph';

function MainPage() {
  const bloodSugarData = [
    { time: '11:04', level: 100 },
    { time: '11:19', level: 150 },
    { time: '11:34', level: 200 },
    // ... more data
  ];

  return (
    <div className="main-page bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">DAIA Dashboard</h1>
      <div className="main-page-content flex">
        <div className="main-page-content-right flex justify-between items-center w-full">
          <BloodSugarGraph data={bloodSugarData} className="w-1/3" />
          <EmergencyContactGrid className="w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
