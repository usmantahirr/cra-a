import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import Header from '../molecules/header';

const { Content, Footer } = Layout;

const DualColumnTemplate = ({ children }) => (
  <Layout>
    <Header title="Page Title" />
    <Content>
      <Row>
        <Col md={12}>{children.col1}</Col>
        <Col md={12}>{children.col2}</Col>
      </Row>
    </Content>
    <Footer>This is footer</Footer>
  </Layout>
);

DualColumnTemplate.propTypes = {
  children: PropTypes.shape({
    col1: PropTypes.node,
    col2: PropTypes.node,
  }).isRequired,
};

export default DualColumnTemplate;
