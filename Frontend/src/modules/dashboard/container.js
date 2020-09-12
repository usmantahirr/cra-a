import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardPage from '../../shared/pages/Dashboard';
import { getJsonSchema } from './redux';
import CustomSpinner from '../../shared/atoms/spinner';
import dashboardService from './services/dashboard.service';

const Dashboard = () => {
  // TODO: add call to check if patient is new or is registered already
  // TODO: Add call to get schema

  const tailLayout = {
    wrapperCol: {
      offset: 24,
      span: 24,
    },
  };

  // eslint-disable-next-line global-require
  // const formSchema = require('../../../src/staticFormSchemaMock.json');
  const [pageState, setPageState] = React.useState({ prev: null, curr: 0, next: null });
  const [applicationFormData, setApplicationFormData] = React.useState({});
  const dispatch = useDispatch();
  const fetchSchema = () => dispatch(getJsonSchema());
  const formSchema = useSelector(state => state.dashboard);
  const [showLoader, setShowLoader] = React.useState(false);

  useEffect(() => {
    fetchSchema();
  }, []);

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

  const onFinish = async (values, formIndex) => {
    // return { values, formIndex };
    // console.log('Success:', values, formIndex);
    const newFormData = { ...applicationFormData };
    newFormData[formIndex] = values;
    console.log('Application form data = ', newFormData);
    setApplicationFormData(newFormData);
    setShowLoader(true);
    const data = await dashboardService.saveDraft(newFormData);
    console.log(data);
    setShowLoader(false);
    goForward();
    // const temp = savedForms;
    // temp[formIndex] = values;
    // setSavedForms(temp);
    // setFormStep(Math.min(formSchema.length - 1, formStep + 1));
  };

  const onFinishFailed = (errorInfo, formIndex) => {
    // return { errorInfo, formIndex };
    console.log('Failed:', errorInfo, formIndex);
  };

  const onAllStepsCompleted = values => {
    // return values;
    console.log('ALL STEPS COMPLETED:', values);
    // console.log('ALL FORMS = ', savedForms);
  };

  const onFormValueChanges = values => {
    return values;
    // console.log('FORM VAL CHANGED ', values);
  };

  return (
    <Fragment>
      {(showLoader || (formSchema && formSchema.length === 0)) && <CustomSpinner tip="loading..." />}
      {formSchema && formSchema.length > 0 && (
        <DashboardPage
          pageState={pageState}
          goForward={goForward}
          goBack={goBack}
          formSchema={formSchema}
          tailLayout={tailLayout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onAllStepsCompleted={onAllStepsCompleted}
          applicationFormData={applicationFormData}
          onFormValueChanges={onFormValueChanges}
        />
      )}
    </Fragment>
  );
};

export default Dashboard;
