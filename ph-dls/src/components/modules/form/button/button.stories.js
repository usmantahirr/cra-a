import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './index';

storiesOf('Modules/Form/Button', module).add('with text', () => (
  <Button onClick={action('Clicked')}>Button</Button>
));
