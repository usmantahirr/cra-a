import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../organisms/sidebar';

const DashboardTemplate = ({ children }) => (
  <Layout className="main-section">
    <Sidebar />
    <Layout>{children}</Layout>
  </Layout>
);

export default DashboardTemplate;
