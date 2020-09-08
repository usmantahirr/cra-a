import React from 'react';
import { Layout } from 'antd';

import Header from '../molecules/header';
import Footer from '../molecules/footer';
import Sidebar from '../organisms/sidebar';

const { Content } = Layout;

const DashboardTemplate = ({ children }) => (
  <Layout>
    <Sidebar />
    <Layout>
      <Header />
      <Content>
        this is content
        {children}
      </Content>
      <Footer />
    </Layout>
  </Layout>
);

export default DashboardTemplate;
