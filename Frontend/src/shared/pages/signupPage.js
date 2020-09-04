import React from 'react';
import { Form } from 'antd';
import Button from '../atoms/buttons/index';
import InputCustom from '../atoms/inputs/inputCustom';
import AuthPageTemplate from '../templates/AuthPageTemplate';

const Signup = () => {
  return (
    <AuthPageTemplate>
      <Form className="transbg-form">
        <InputCustom placeholder="First Name" type="text" value="fname" className="" />
        <InputCustom placeholder="Last Name" type="text" value="lname" className="custom-control" />
        <InputCustom placeholder="Email Address" type="email" value="email" className="custom-control" />
        <InputCustom placeholder="Mobile Number" type="text" value="mobile" className="custom-control" />
        <InputCustom placeholder="Password" type="password" value="password" className="custom-control" />
        <InputCustom placeholder="Confirm Password" type="password" value="cpassword" className="custom-control" />
        <Form.Item>
          <Button type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
            Register
          </Button>
        </Form.Item>
      </Form>
    </AuthPageTemplate>
  );
};

export default Signup;
