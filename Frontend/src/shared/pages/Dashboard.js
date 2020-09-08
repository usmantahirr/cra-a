import React from 'react';
// import React, { useContext } from 'react';
import { Layout } from 'antd';
// import NotificationContext from '../modules/notification/context';
// import ErrorContext from '../modules/error/context';
import DashboardTemplate from '../templates/dashboardTemplate';
import Header from '../molecules/header';
import Footer from '../molecules/footer';

const { Content } = Layout;

const Dashboard = props => {
  // const notification = useContext(NotificationContext);
  // const errorContext = useContext(ErrorContext);
  console.log('Page state', props);

  return (
    <DashboardTemplate>
      <Header />
      <Content>this is content</Content>
      <Footer />
    </DashboardTemplate>
  );
};

export default Dashboard;
