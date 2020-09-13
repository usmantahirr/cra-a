import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router';

import DashboardPage from '../../shared/pages/Dashboard';
import { getJsonSchema } from './redux';
import CustomSpinner from '../../shared/atoms/spinner';
import dashboardService from './services/dashboard.service';
import ErrorContext from '../../shared/modules/error/context';
import Logger from '../../shared/modules/logger';

const tailLayout = {
  wrapperCol: {
    offset: 24,
    span: 24,
  },
};

const Dashboard = () => {
  // TODO: add call to check if patient is new or is registered already
  // TODO: Add call to get schema

  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const fetchSchema = () => dispatch(getJsonSchema());
  const formSchema = useSelector(state => state.dashboard);
  const errorContext = useContext(ErrorContext);

  const [pageState, setPageState] = useState({
    prev: null,
    curr: match.params && match.params.applicationId && match.params.stepId ? parseInt(match.params.stepId, 10) : 0,
    next: null,
  });
  const [applicationFormData, setApplicationFormData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [applicationId, setApplicationId] = useState(
    match.params && match.params.applicationId ? match.params.applicationId : null
  );

  useEffect(() => {
    fetchSchema();
  }, []);

  const goForward = appId => {
    if (pageState.curr !== formSchema.length - 1) {
      const newState = {
        prev: pageState.curr,
        curr: pageState.curr + 1,
        next: pageState.curr + 2 > formSchema.length - 1 ? null : pageState.curr + 2,
      };
      if (appId) {
        setPageState(newState);
        history.push(`/register/${appId}/${newState.curr}`);
      }
    }
  };

  const goBack = () => {
    if (pageState.curr !== 0) {
      const newState = {
        prev: pageState.curr - 2 === -1 ? null : pageState.curr - 2,
        curr: pageState.curr - 1,
        next: pageState.curr,
      };

      if (applicationId) {
        setPageState(newState);
        history.push(`/register/${applicationId}/${newState.curr}`);
      }
    }
  };

  const onFinish = async (values, formIndex) => {
    const newFormData = { ...applicationFormData };
    newFormData[formIndex] = values;
    setApplicationFormData(newFormData);
    setShowLoader(true);

    try {
      const data = await dashboardService.saveDraft(newFormData);
      setApplicationId(data.applicationId);
      goForward(data.applicationId);
    } catch (e) {
      errorContext.setError(e);
    }

    setShowLoader(false);
  };

  const onFinishFailed = (errorInfo, formIndex) => {
    Logger.info('Failed:', errorInfo, formIndex);
  };

  const onAllStepsCompleted = values => {
    Logger.info('ALL STEPS COMPLETED:', values);
  };

  const onFormValueChanges = values => {
    return values;
  };

  Logger.info(pageState);

  return (
    <Fragment>
      {(showLoader || (formSchema && formSchema.length === 0)) && <CustomSpinner />}
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
