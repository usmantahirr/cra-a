import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './index';

storiesOf('Atoms/Image', module).add('Simple', () => (
  <Image
    src="https://www.w3schools.com/w3css/img_lights.jpg"
    alt="Sample Image"
  />
));
