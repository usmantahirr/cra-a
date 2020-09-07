import React from 'react';
import { Layout } from 'antd';
import Button from '../../atoms/buttons';
import authService from '../../../modules/auth/services/auth.service';

const { Header: AntHeader } = Layout;

const Header = ({ title }) => {
  const logout = () => {
    localStorage.clear();
    authService.logout();
  };
  return (
    <AntHeader>
      {title}
      <Button type="secondary" htmlType="button" onClick={logout}>
        Logout
      </Button>
    </AntHeader>
  );
};

export default Header;
