import React from 'react';

import Button from '../../atoms/buttons';
import authService from '../../../modules/auth/services/auth.service';

const ProfileCard = () => {
  const logout = () => {
    localStorage.clear();
    authService.logout();
  };

  return (
    <Button type="secondary" htmlType="button" onClick={logout}>
      Logout
    </Button>
  );
};

export default ProfileCard;
