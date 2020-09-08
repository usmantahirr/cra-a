import React from 'react';
import { Layout } from 'antd';
import Button from '../../atoms/buttons';
import MSALService from '../../../modules/auth/services/msal.service';

const { Header: AntHeader } = Layout;

const Header = ({ title }) => {
  const logout = () => {
    localStorage.clear();
    MSALService.logout();
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
