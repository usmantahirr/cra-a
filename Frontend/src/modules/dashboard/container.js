import React from 'react';
import DualColumnTemplate from '../../shared/templates/DualColumnTemplate';

const Dashboard = () => (
  <DualColumnTemplate>
    {{
      col1: <h1>Dual Column</h1>,
      col2: <div>Application Home</div>,
    }}
  </DualColumnTemplate>
);

export default Dashboard;
