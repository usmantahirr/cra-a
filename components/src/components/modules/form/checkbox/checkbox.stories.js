import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from './index';

storiesOf('Modules/Form/Checkbox', module).add('Simple', () => (
  <Checkbox onChange={action('changed')}>This is checkbox</Checkbox>
));
