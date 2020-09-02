import React from 'react';
import { FormattedMessage } from 'react-intl';

import DualColumnTemplate from '../../shared/templates/DualColumnTemplate';
import DashboardPage from '../../shared/pages/Dashboard';

const Dashboard = () => (
  <DualColumnTemplate>
    {{
      col1: (
        <h1>
          {' '}
          <FormattedMessage id="title" />{' '}
        </h1>
      ),
      col2: <DashboardPage />,
    }}
  </DualColumnTemplate>
);

export default Dashboard;
