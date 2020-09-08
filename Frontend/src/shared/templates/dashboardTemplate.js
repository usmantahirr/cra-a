import React from 'react';
import { Layout } from 'antd';

import Header from '../molecules/header';
// import Footer from '../molecules/footer';
import Sidebar from '../organisms/sidebar';

const { Content } = Layout;

const DashboardTemplate = ({ children }) => (
  <Layout className="main-section">
    <Sidebar />
    <Layout>
      <Header />
      <Content>{children}</Content>
      {/* <Footer /> */}
    </Layout>
  </Layout>
);

export default DashboardTemplate;
