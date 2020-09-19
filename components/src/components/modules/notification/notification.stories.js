import React from 'react';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';

import Notification from './index';
import { NotificationContextConsumer } from './context';

const notification = {
  type: 'success',
  fail: false,
  message: 'This is Success Message'
};

storiesOf('Modules/Notification', module).add('default', () => (
  <Notification>
    <NotificationContextConsumer>
      {({ setNotification }) => (
        <>
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => {
              setNotification(notification, true);
            }}
          >
            Show Success
          </Button>
          <br />
          <Button
            danger
            style={{ margin: '10px' }}
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  type: 'error',
                  message: 'This is Error Message'
                },
                true
              );
            }}
          >
            Show Error
          </Button>
          <br />
          <Button
            style={{ margin: '10px' }}
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  type: 'info',
                  message: 'This is Info Message'
                },
                true
              );
            }}
          >
            Show Info
          </Button>
          <br />
        </>
      )}
    </NotificationContextConsumer>
  </Notification>
));

storiesOf('Modules/Notification', module).add('Change Position', () => (
  <Notification>
    <NotificationContextConsumer>
      {({ setNotification }) => (
        <>
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  position: 'bc'
                },
                true
              );
            }}
          >
            Bottom Center
          </Button>
          <br />
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  position: 'bl'
                },
                true
              );
            }}
          >
            Bottom left
          </Button>
          <br />
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  position: 'br'
                },
                true
              );
            }}
          >
            Bottom Right
          </Button>
          <br />
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  position: 'tl'
                },
                true
              );
            }}
          >
            Top Left
          </Button>
          <br />
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => {
              setNotification(
                {
                  ...notification,
                  position: 'tc'
                },
                true
              );
            }}
          >
            Bottom Center
          </Button>
          <br />
        </>
      )}
    </NotificationContextConsumer>
  </Notification>
));
