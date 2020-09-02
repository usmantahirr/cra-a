import React from 'react';
import Logger from '../../shared/modules/logger';

const defaultAuthContext = {
  authenticate: (token, user) => {
    Logger.info(token, user);
  },
  checkAuthentication: () => true,
  isAuthenticated: false,
  logout: () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;
