import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/buttons';
import { CustomUpload } from '../atoms/forms/index';
import NotificationContext from '../modules/notification/context';
import ErrorContext from '../modules/error/context';

const Dashboard = () => {
  const notification = useContext(NotificationContext);
  const errorContext = useContext(ErrorContext);

  return (
    <React.Fragment>
      Click it to get notification test
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
      <ul>
        <li>
          <Link to="/dynamic-form">New Registration</Link>
        </li>
        <li>{/* <Link to="/manageRegistration">Manage Registration</Link> */}</li>
      </ul>
      <CustomUpload>Upload</CustomUpload>
    </React.Fragment>
  );
};

export default Dashboard;
