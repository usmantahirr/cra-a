import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AuthContext } from './authContext';
import LoginPage from './loginPage';
import AuthRedux from './redux/index';

const AuthContainer = ({ history }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const login = payload => dispatch(AuthRedux.LoginAction(payload));
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
  return <LoginPage handleSubmit={handleSubmit} t={t} />;
};

export default withRouter(AuthContainer);
