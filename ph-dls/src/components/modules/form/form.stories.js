import React from 'react'
import { action } from '@storybook/addon-actions'

import Form from './index'

const { Button } = Form

export const SimpleButton = () => (
  <Button onClick={action('Button Click')}>Button</Button>
)

export default {
  title: 'Modules/Form',
  component: Form
}
