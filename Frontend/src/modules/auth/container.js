import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AuthContext } from './authContext';

import LoginPage from '../../shared/pages/loginPage';
import LoginAction from './redux';

const AuthContainer = ({ history }) => {
  const dispatch = useDispatch();

  const login = payload => dispatch(LoginAction(payload));
  const authContext = useContext(AuthContext);

  if (authContext.checkAuthentication()) {
    // TODO: Redirection to current page;
    history.push('/');
  }

  const handleSubmit = ({ email, password }) => {
    if (email && password) {
      const payload = { email, password };
      login(payload);
      authContext.authenticate('token', 'user');
    }
  };
  return <LoginPage handleSubmit={handleSubmit} />;
};

export default withRouter(AuthContainer);
