import React from 'react';

const defaultAuthContext = {
  authenticate: (token, user) => {
    // TODO REMOVE LINE BELOW
    // IT WAS ADDED TO REMOVE ESLINT WARN OF UNUSED VAR
    return token + user;
    // console.log(token, user);
  },
  checkAuthentication: () => true,
  isAuthenticated: false,
  logout: () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;
