import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '../atoms/buttons';
import NotificationContext from '../modules/notification/context';
import ErrorContext from '../modules/error/context';
import FormPage from './FormPage';

const Dashboard = () => {
  const notification = useContext(NotificationContext);
  const errorContext = useContext(ErrorContext);

  return (
    <React.Fragment>
      Click it to get notification
      <Button
        type="primary"
        onClick={e => {
          e.preventDefault();
          notification.setNotification(
            {
              type: 'success',
              message: 'This is message',
            },
            true
          );
        }}
      >
        Show Notification
      </Button>
      <Button
        onClick={e => {
          e.preventDefault();
          errorContext.setError(new Error('Something happened'), true);
        }}
      >
        Show Error
      </Button>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/newRegistration">New Registration</Link>
            </li>
            <li>
              <Link to="/manageRegistration">Manage Registration</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/newRegistration">
              <FormPage></FormPage>
            </Route>
            <Route path="/manageRegistration">
              <span>THIS IS MANAGE</span>
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default Dashboard;
