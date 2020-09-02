import React from 'react';
import CustomForm from '../modules/customForm/customForm';

const FormPage = () => {
  // eslint-disable-next-line global-require
  const formSchema = require('../../../src/staticFormSchema.json');

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = values => {
    return values;
    // console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    return errorInfo;
    // console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      THIS IS FORM PAGE LOAD YOUR DYNAMIC FORM BELOW
      <CustomForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        formSchema={formSchema}
        formOrientation="horizontal"
        layout={layout}
        tailLayout={tailLayout}
      ></CustomForm>
    </React.Fragment>
  );
};

export default FormPage;
