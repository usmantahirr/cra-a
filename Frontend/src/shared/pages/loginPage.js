import React from 'react';
import { CustomCheckbox, CustomUpload } from '../atoms/forms/index';
import { RadioButton, RadioGroup } from '../atoms/radio/index';
import ImageRadio from '../molecules/imageRadio/index';

const imageOptions = [
  {
    value: '1',
    text: 'Abu Dhabi',
    src: '/assets/img/abudhabi.png',
    id: 'VIET1',
  },
  {
    value: '2',
    text: 'Dubai',
    src: '/assets/img/dubai.png',
    id: 'VIET2',
  },
];

const LoginPage = () => (
  <div>
    <CustomCheckbox>
      I Have Read And Accepted The <a href="/">Terms & Conditions</a>
    </CustomCheckbox>

    <RadioButton className="ant-radio-lg">Test</RadioButton>

    <RadioGroup className="ant-radio-lg"></RadioGroup>

    <ImageRadio imageOptions={imageOptions} />

    <CustomUpload>Upload</CustomUpload>
  </div>
);

export default LoginPage;
