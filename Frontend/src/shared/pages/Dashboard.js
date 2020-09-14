import React from 'react';
import { Layout, Form, Row, Col, Modal } from 'antd';

import CustomScroll from 'react-custom-scroll';
import Button from '../atoms/buttons';
import DashboardTemplate from '../templates/dashboardTemplate';
import Header from '../molecules/header';
import Footer from '../molecules/footer';
import CustomFormItem from '../modules/customForm/customFormItem';

const { Content } = Layout;

const Dashboard = props => {
  const { goBack, formSchema, pageState, applicationFormData, applicationId, setApplicationFormData } = props;

  const _renderFieldArray = (fieldArray, form, colSize) => {
    if (colSize)
      return fieldArray.map(field => (
        <Col span={colSize}>
          <CustomFormItem
            key={field.id}
            {...field}
            form={form}
            applicationId={applicationId}
            setApplicationFormData={setApplicationFormData}
            applicationFormData={applicationFormData}
          />
        </Col>
      ));
    return fieldArray.map(field => (
      <CustomFormItem
        key={field.id}
        {...field}
        form={form}
        applicationId={applicationId}
        setApplicationFormData={setApplicationFormData}
        applicationFormData={applicationFormData}
      />
    ));
  };

  const _renderRowArray = (rowArray, form) => {
    return rowArray.map(row => {
      const colSize = 24 / row.fieldArray.length;
      return <Row gutter={24}>{row.fieldArray && _renderFieldArray(row.fieldArray, form, colSize)}</Row>;
    });
  };

  const _renderSection = (section, form) => {
    return (
      <div key={section.id}>
        <h3>{section.sectionTitle}</h3>
        {(section.fieldArray && _renderFieldArray(section.fieldArray, form)) ||
          (section.rowArray && _renderRowArray(section.rowArray, form))}
      </div>
    );
  };

  const _renderFormButtons = (isLastStep, form) => {
    const { onAllStepsCompleted, saveAsDraft } = props;
    return (
      <Footer
        goBack={goBack}
        onAllStepsCompleted={onAllStepsCompleted}
        saveAsDraft={() => saveAsDraft(form)}
        isLastStep={isLastStep}
      />
    );
  };

  const _renderStepForm = (step, stepsCount, currStep) => {
    const [form] = Form.useForm(); // TODO: can cause issue
    const { name } = step;
    const { layout, onFinish, onFinishFailed, onFieldsChange, onFormValueChanges } = props;

    return (
      <Form
        key={`${step.id}${name}`}
        {...layout}
        name={name}
        form={form}
        layout="vertical"
        initialValues={applicationFormData}
        onFinish={result => onFinish(result, currStep)}
        onFinishFailed={result => onFinishFailed(result, currStep)}
        onFieldsChange={onFieldsChange}
        onValuesChange={onFormValueChanges}
      >
        <div className={`content-scroll ${currStep === 0 ? 'contentNSummeryScroll' : ' '}`}>
          <CustomScroll heightRelativeToParent="100%">
            {step.sections && step.sections.map(section => _renderSection(section, form))}
          </CustomScroll>
        </div>
        {_renderFormButtons(currStep === stepsCount - 1, form)}

        <Modal centered destroyOnClose footer={null} className="custom-popup text-popup" width={590}>
          <div className="custompopup-text">Submitted Successfully For Test</div>
          <div className="custom-content-holder">
            <div className="text-holder">
              <h3 className="title">Medical Test REGISTRATION Application NO. 59065</h3>
              <p>
                Kindly visit the selected facility to proceed with the test. a copy of the application has been emailed
                to you on your email address. acd@yahoo.com and downloaded on your system. please bring a copy of your
                application to the appointment.
              </p>
            </div>
            <Button type="primary" htmlType="submit" className="ant-btn-block ant-btn-lg">
              Go back to home page
            </Button>
          </div>
        </Modal>
      </Form>
    );
  };

  const _renderStepsBody = (schema, currStep) => {
    return (
      schema &&
      schema.map(
        (step, currIndex) => currIndex === currStep && _renderStepForm(step, schema.length, currStep, currIndex)
      )
    );
  };

  return (
    <DashboardTemplate>
      <Header
        pageState={pageState}
        formSchema={formSchema}
        applicationFormData={applicationFormData}
        applicationId={applicationId}
      />
      <Content className="content-holder">{_renderStepsBody(formSchema, pageState.curr)}</Content>
    </DashboardTemplate>
  );
};

export default Dashboard;
