import React from 'react';
import CustomForm from '../modules/customForm/customForm';

const FormPage = () => {
  // eslint-disable-next-line global-require
  const formSchema = require('../../../src/staticFormSchemaMock.json');
  // const [savedForms, setSavedForms] = React.useState([]);

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onAllStepsCompleted = values => {
    return values;
    // console.log('Success:', values);
    // console.log('ALL FORMS = ', savedForms);
  };

  const onFinish = (values, formIndex) => {
    return { values, formIndex };
    // console.log('Success:', values, formIndex);
    // const temp = savedForms;
    // temp[formIndex] = values;
    // setSavedForms(temp);
    // setFormStep(Math.min(formSchema.length - 1, formStep + 1));
  };

  const onFinishFailed = (errorInfo, formIndex) => {
    return { errorInfo, formIndex };
    // console.log('Failed:', errorInfo, formIndex);
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

  const [formStep, setFormStep] = React.useState(0);
  const goBack = () => {
    setFormStep(Math.max(0, formStep - 1));
  };

  return (
    <React.Fragment>
      <CustomForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onAllStepsCompleted={onAllStepsCompleted}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        formSchema={formSchema}
        formOrientation="horizontal"
        tailLayout={tailLayout}
        formStep={formStep}
        setFormStep={setFormStep}
        goBack={goBack}
      />
    </React.Fragment>
  );
};

export default FormPage;
