import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from './index';

storiesOf('Modules/Form/Input', module).add('with text', () => (
  <Input onChange={action('Changed')} />
));
