import React from 'react';
import DashboardPage from '../../shared/pages/Dashboard';

const Dashboard = () => {
  // TODO: add call to check if patient is new or is registered already
  // TODO: Add call to get schema

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

  // eslint-disable-next-line global-require
  const formSchema = require('../../../src/staticFormSchemaMock.json');
  const [pageState, setPageState] = React.useState({ prev: null, curr: 0, next: null });

  const goForward = () => {
    // If can go forward
    if (pageState.curr !== formSchema.length - 1) {
      const newState = {
        prev: pageState.curr,
        curr: pageState.curr + 1,
        next: pageState.curr + 2 > formSchema.length - 1 ? null : pageState.curr + 2,
      };
      setPageState(newState);
    }
  };

  const goBack = () => {
    // If can go backward
    if (pageState.curr !== 0) {
      const newState = {
        prev: pageState.curr - 2 === -1 ? null : pageState.curr - 2,
        curr: pageState.curr - 1,
        next: pageState.curr,
      };
      setPageState(newState);
    }
  };

  const onFinish = (values, formIndex) => {
    // return { values, formIndex };
    console.log('Success:', values, formIndex);
    // const temp = savedForms;
    // temp[formIndex] = values;
    // setSavedForms(temp);
    // setFormStep(Math.min(formSchema.length - 1, formStep + 1));
  };

  const onFinishFailed = (errorInfo, formIndex) => {
    // return { errorInfo, formIndex };
    console.log('Failed:', errorInfo, formIndex);
  };

  return (
    <DashboardPage
      pageState={pageState}
      goForward={goForward}
      goBack={goBack}
      formSchema={formSchema}
      layout={layout}
      tailLayout={tailLayout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  );
};

export default Dashboard;
