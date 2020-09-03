import { Form, Button, Steps } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

import CustomFormItem from './customFormItem';

const { Step } = Steps;

function CustomForm(props) {
  const [formStep, setFormStep] = React.useState(5);

  const goBack = () => {
    setFormStep(Math.max(0, formStep - 1));
  };

  const goForward = () => {
    setFormStep(Math.min(props.formSchema.length - 1, formStep + 1));
  };

  const _renderStepsHeader = (formSchema, currStep) => {
    return <Steps current={currStep}>{formSchema && formSchema.map(step => <Step key={step.id} />)}</Steps>;
  };

  const _renderFieldArray = fieldArray => {
    return fieldArray.map(field => <CustomFormItem key={field.id} {...field}></CustomFormItem>);
  };

  const _renderSection = section => {
    // Each div represents a form section
    // Form sections can be aligned horionztally or vertically
    // Add styling to this div to align sections
    // GD-TODO
    return (
      <div key={section.id}>
        <h3>{section.sectionTitle}</h3>
        {_renderFieldArray(section.fieldArray)}
      </div>
    );
  };

  const _renderFormButtons = layoutProps => {
    return (
      <Form.Item {...layoutProps}>
        <Button onClick={goBack}>Back</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={goForward}>Next</Button>
      </Form.Item>
    );
  };

  const _renderStepForm = (step, currStep, currIndex) => {
    const [form] = Form.useForm();
    const { name, formOrientation, initialValues } = step;
    const { layout, tailLayout, onFinish, onFinishFailed, onValuesChange, onFieldsChange } = props;
    return (
      <Form
        key={`${step.id}${name}`}
        hidden={currIndex !== currStep}
        {...layout}
        name={name}
        form={form}
        layout={formOrientation}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
      >
        <h1>{step.stepTitle}</h1>
        {step.sections && step.sections.map(section => _renderSection(section))}
        {_renderFormButtons(tailLayout)}
      </Form>
    );
  };

  const _renderStepsBody = (formSchema, currStep) => {
    return formSchema && formSchema.map((step, currIndex) => _renderStepForm(step, currStep, currIndex));
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
