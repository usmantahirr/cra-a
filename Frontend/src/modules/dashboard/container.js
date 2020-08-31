import React from 'react';

import DualColumnTemplate from '../../shared/templates/DualColumnTemplate';
import DashboardPage from '../../shared/pages/Dashboard';

const Dashboard = () => (
  <DualColumnTemplate>
    {{
      col1: <h1>Dual Column</h1>,
      col2: <DashboardPage />,
    }}
  </DualColumnTemplate>
);

export default Dashboard;
