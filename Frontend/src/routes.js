import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { AuthContext } from './modules/auth/authContext';
import AuthRoutes from './modules/auth/routes';
import DashboardRoutes from './modules/dashboard/routes';
import ManageApplicationRoutes from './modules/manageApplication/routes';
import MoreOnCovidRoutes from './modules/moreOnCovid/routes';
import FaqRoutes from './modules/faq/routes';

import { AUTH_PAGE } from './config';
import CustomSpinner from './shared/atoms/spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      exact
      render={props => (authContext.checkAuthentication() ? <Component {...props} /> : <Redirect to={AUTH_PAGE} />)}
    />
  );
};

const renderRouteFromList = isPrivate => (item, i) => {
  const { Component } = item;
  if (isPrivate) {
    return <PrivateRoute exact key={i} path={item.path} component={Component} />;
  }
  return <Route exact key={i} path={item.path} component={Component} />;
};

const Routes = () => (
  <Suspense fallback={<CustomSpinner tip="loading..." />}>
    <Switch>
      {AuthRoutes.map(renderRouteFromList())}
      {DashboardRoutes.map(renderRouteFromList(true))}
      {ManageApplicationRoutes.map(renderRouteFromList(true))}
      {MoreOnCovidRoutes.map(renderRouteFromList(true))}
      {FaqRoutes.map(renderRouteFromList(true))}
    </Switch>
  </Suspense>
);

export default Routes;
