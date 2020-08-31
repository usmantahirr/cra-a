import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { AuthContextProvider } from './authContext';
import { AUTH_PAGE, LOGGED_IN_HOME } from '../../config';

const AuthContextContainer = ({ history, children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
  });

  const authenticate = (token, user) => {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setState({ isAuthenticated: true });
    history.push(LOGGED_IN_HOME);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setState({ isAuthenticated: false });
    history.push(AUTH_PAGE);
  };

  const checkAuthentication = () => !!localStorage.getItem('user') && !!localStorage.getItem('token');

  return (
    <AuthContextProvider value={{ isAuthenticated: state.isAuthenticated, authenticate, logout, checkAuthentication }}>
      {children}
    </AuthContextProvider>
  );
};

export default withRouter(AuthContextContainer);
