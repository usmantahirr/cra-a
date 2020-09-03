import React from 'react';
import CustomForm from '../modules/customForm/customForm';

const FormPage = () => {
  // eslint-disable-next-line global-require
  const formSchema = require('../../../src/staticFormSchemaMock.json');

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

  const onValuesChange = (changedVal, allVal) => {
    return changedVal + allVal;

    // console.log('changed val:', changedVal);
    // console.log('All val:', allVal);
  };

  const onFieldsChange = (changedField, allFields) => {
    // console.log('changed field:', changedField);
    return changedField + allFields;
    // console.log('All fields:', allFields);
  };

  return (
    <React.Fragment>
      <CustomForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        formSchema={formSchema}
        formOrientation="horizontal"
        layout={layout}
        tailLayout={tailLayout}
      ></CustomForm>
    </React.Fragment>
  );
};

export default FormPage;
