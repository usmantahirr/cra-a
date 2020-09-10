import { Form, Button, Steps } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

import CustomFormItem from './customFormItem';

const { Step } = Steps;

function CustomForm(props) {
  const { formStep, goBack } = props;

  const _renderStepsHeader = (formSchema, currStep) => {
    return <Steps current={currStep}>{formSchema && formSchema.map(step => <Step key={step.id} />)}</Steps>;
  };

  const _renderFieldArray = (fieldArray, form) => {
    return fieldArray.map(field => <CustomFormItem key={field.id} {...field} form={form}></CustomFormItem>);
  };

  const _renderSection = (section, form) => {
    // Each div represents a form section
    // Form sections can be aligned horionztally or vertically
    // Add styling to this div to align sections
    // GD-TODO
    return (
      <div key={section.id}>
        <h3>{section.sectionTitle}</h3>
        {_renderFieldArray(section.fieldArray, form)}
      </div>
    );
  };

  const _renderFormButtons = (layoutProps, isLastStep, onAllStepsCompleted) => {
    return (
      <Form.Item {...layoutProps}>
        <Button onClick={goBack}>Prev</Button>
        <Button type="primary">Save As Draft</Button>
        <Button htmlType="submit">Next</Button>
        {/* <Button onClick={goForward}>Next</Button> */}
        {isLastStep && <Button onClick={onAllStepsCompleted}>Finish</Button>}
      </Form.Item>
    );
  };

  const _renderStepForm = (step, stepsCount, currStep, currIndex) => {
    const [form] = Form.useForm();
    const { name, formOrientation, initialValues } = step;
    const { layout, tailLayout, onFinish, onFinishFailed, onValuesChange, onFieldsChange, onAllStepsCompleted } = props;
    return (
      <Form
        key={`${step.id}${name}`}
        hidden={currIndex !== currStep}
        {...layout}
        name={name}
        form={form}
        layout={formOrientation}
        initialValues={initialValues}
        onFinish={result => onFinish(result, currStep)}
        onFinishFailed={result => onFinishFailed(result, currStep)}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
      >
        {/* <h1 className="test">{step.stepTitle}</h1> */}
        {step.sections && step.sections.map(section => _renderSection(section, form))}
        {_renderFormButtons(tailLayout, currStep === stepsCount - 1, onAllStepsCompleted)}
      </Form>
    );
  };

  const _renderStepsBody = (formSchema, currStep) => {
    return (
      formSchema && formSchema.map((step, currIndex) => _renderStepForm(step, formSchema.length, currStep, currIndex))
    );
  };

  const { formSchema } = props;

  return (
    <>
      {_renderStepsHeader(formSchema, formStep)}
      {_renderStepsBody(formSchema, formStep)}
    </>
  );
}

export default CustomForm;
