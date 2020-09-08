import React from 'react';
import { CustomCheckbox, CustomUpload } from '../atoms/forms/index';
import { RadioButton, RadioGroup } from '../atoms/radio/index';
import ImageRadio from '../molecules/imageRadio/index';

const imageOptions = [
  {
    id: 1,
    src: '/assets/img/abudhabi.png',
    title: 'Abu Dhabi',
  },
  {
    id: 2,
    src: '/assets/img/dubai.png',
    title: 'Dubai',
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
