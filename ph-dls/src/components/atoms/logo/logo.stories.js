import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from './index';

storiesOf('Atoms', module).add('Logo', () => (
  <div>
    <Logo
      src="https://www.w3schools.com/w3css/img_lights.jpg"
      href="/"
      title="Logo"
    />
  </div>
));
