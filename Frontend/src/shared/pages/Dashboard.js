import React from 'react';
// import React, { useContext } from 'react';
import { Layout, Form } from 'antd';
// import NotificationContext from '../modules/notification/context';
// import ErrorContext from '../modules/error/context';
import DashboardTemplate from '../templates/dashboardTemplate';
import Header from '../molecules/header';
import Footer from '../molecules/footer';
import CustomFormItem from '../modules/customForm/customFormItem';

const { Content } = Layout;

const Dashboard = props => {
  // const notification = useContext(NotificationContext);
  // const errorContext = useContext(ErrorContext);
  const { goBack, formSchema, pageState, applicationFormData } = props;

  const _renderFieldArray = (fieldArray, form) => {
    return fieldArray.map(field => (
      <CustomFormItem key={field.id} {...field} form={form} applicationFormData={applicationFormData}></CustomFormItem>
    ));
  };

  const _renderSection = (section, form) => {
    return (
      <div key={section.id}>
        {/* <h3>{section.sectionTitle}</h3> */}
        {_renderFieldArray(section.fieldArray, form)}
      </div>
    );
  };

  const _renderFormButtons = isLastStep => {
    const { onAllStepsCompleted } = props;
    return <Footer goBack={goBack} onAllStepsCompleted={onAllStepsCompleted} isLastStep={isLastStep} />;
  };

  const _renderStepForm = (step, stepsCount, currStep, currIndex) => {
    const [form] = Form.useForm();
    const { name, initialValues } = step;
    const { layout, onFinish, onFinishFailed, onFieldsChange, onFormValueChanges } = props;
    return (
      <Form
        key={`${step.id}${name}`}
        hidden={currIndex !== currStep}
        {...layout}
        name={name}
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={result => onFinish(result, currStep)}
        onFinishFailed={result => onFinishFailed(result, currStep)}
        onFieldsChange={onFieldsChange}
        onValuesChange={onFormValueChanges}
      >
        <h1>{step.stepTitle}</h1>
        {step.sections && step.sections.map(section => _renderSection(section, form))}
        {_renderFormButtons(currStep === stepsCount - 1)}
      </Form>
    );
  };

  const _renderStepsBody = (schema, currStep) => {
    return schema && schema.map((step, currIndex) => _renderStepForm(step, schema.length, currStep, currIndex));
  };

  return (
    <DashboardTemplate>
      <Header pageState={pageState} formSchema={formSchema} applicationFormData={applicationFormData} />
      <Content className="content-holder">{_renderStepsBody(formSchema, pageState.curr)}</Content>
    </DashboardTemplate>
  );
};

export default Dashboard;
