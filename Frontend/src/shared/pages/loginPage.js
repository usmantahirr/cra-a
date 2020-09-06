import React from 'react';
import CustomCheckbox from '../atoms/forms/checkbox';
import RadioButton from '../atoms/radio/radioButton';
import RadioGroup from '../atoms/radio/radioGroup';
import AuthPageTemplate from '../templates/AuthPageTemplate';

const LoginPage = () => (
  <AuthPageTemplate>
    {/* <Radio.Group defaultValue="a" className="Test">
      <Radio value="a">Transit Visa</Radio>
      <Radio value="b">Visitor</Radio>
      <Radio value="c">UAE Resident</Radio>
    </Radio.Group> */}

    <CustomCheckbox>
      I Have Read And Accepted The <a href="/">Terms & Conditions</a>
    </CustomCheckbox>

    <RadioButton className="ant-radio-lg">Test</RadioButton>

    <RadioGroup className="ant-radio-lg"></RadioGroup>
  </AuthPageTemplate>
);

export default LoginPage;
