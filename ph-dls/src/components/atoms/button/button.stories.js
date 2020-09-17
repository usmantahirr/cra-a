import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './index';

const StyledButton = styled(Button)`
  margin: 10px;
`;

storiesOf('Atoms/Button', module).add('with text', () => (
  <div>
    <StyledButton onClick={action('Clicked')} type="primary">
      Button
    </StyledButton>
    <StyledButton onClick={action('Clicked')} type="primary">
      Button
    </StyledButton>
    <StyledButton type="primary" danger onClick={action('Clicked')}>
      Danger
    </StyledButton>
  </div>
));
