import React from 'react'

import 'ph-dls-lib/dist/index.css'

import { Image, Form } from 'ph-dls-lib'
const { Button } = Form

const App = () => {
  return (
    <div>
      <Image src='https://www.w3schools.com/w3css/img_lights.jpg' />
      <Button text='Btn'>This Button</Button>
    </div>
  )
}

export default App
