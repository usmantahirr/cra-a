import React, { useContext } from 'react';
import Button from '../atoms/buttons';
import NotificationContext from '../modules/notification/context';
import ErrorContext from '../modules/error/context';

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
    </React.Fragment>
  );
};

export default Dashboard;
