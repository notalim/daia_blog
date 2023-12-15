import React from "react";
import "../containers/styles/MainPage.css";
import EmergencyContactGrid from "../components/EmergencyContactsGrid";

function MainPage() {
  return (
    <div className="main-page bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">DAIA Dashboard</h1>
      <div className="main-page-content">
        <div className="main-page-content-right">
          <EmergencyContactGrid />
        </div>
      </div>
    </div>
  );
}

export default MainPage;