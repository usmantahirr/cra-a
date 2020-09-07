import React from 'react';

import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import DashboardPage from '../../shared/pages/Dashboard';

const Dashboard = () => {
  // TODO: add call to check if patient is new or is registered already
  // TODO: Add call to get schema

  return (
    <DashboardTemplate>
      <DashboardPage />
    </DashboardTemplate>
  );
};

export default Dashboard;
