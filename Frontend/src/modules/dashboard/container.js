import React from 'react';

import { useTranslation } from 'react-i18next';
import DualColumnTemplate from '../../shared/templates/DualColumnTemplate';
import DashboardPage from '../../shared/pages/Dashboard';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <DualColumnTemplate>
      {{
        col1: <h1> {t('title')} </h1>,
        col2: <DashboardPage />,
      }}
    </DualColumnTemplate>
  );
};

export default Dashboard;
