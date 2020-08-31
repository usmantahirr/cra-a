import React from 'react';
import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

const Header = ({ title }) => <AntHeader>{title}</AntHeader>;

export default Header;
