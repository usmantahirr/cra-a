import React from 'react';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';
import Logger from './index';

storiesOf('Modules', module).add('Logger', () => (
  <div>
    <Button
      style={{ margin: '10px' }}
      onClick={() => {
        Logger.info('This is message');
      }}
    >
      Show Info
    </Button>
    <br />
    <Button
      style={{ margin: '10px' }}
      onClick={() => {
        Logger.warn('This is message');
      }}
    >
      Show Warning
    </Button>
    <br />
    <Button
      style={{ margin: '10px' }}
      onClick={() => {
        Logger.error(new Error('this is error'));
      }}
    >
      Show Error
    </Button>
  </div>
));
