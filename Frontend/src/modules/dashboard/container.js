import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router';
import * as moment from 'moment';

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

const isDate = date => new Date(date) !== 'Invalid Date' && !Number.isNaN(new Date(date));

const Dashboard = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const fetchSchema = () => dispatch(getJsonSchema());
  const formSchema = useSelector(state => state.dashboard);
  const errorContext = useContext(ErrorContext);

  const [pageState, setPageState] = useState({
    prev: null,
    curr: match.params && match.params.uid && match.params.stepId ? parseInt(match.params.stepId, 10) : 0,
    next: null,
  });
  const [applicationFormData, setApplicationFormData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const [applicationData, setApplicationData] = useState({});

  useEffect(() => {
    fetchSchema();
  }, []);

  useEffect(() => {
    async function fetchApplication() {
      if (match.params && match.params.uid) {
        setShowLoader(true);
        try {
          const data = await dashboardService.getApplicationById(match.params.uid);

          Object.keys(data.application_data).forEach(key => {
            if (typeof data.application_data[key] === 'string' && isDate(data.application_data[key])) {
              data.application_data[key] = moment(data.application_data[key]);
            }
          });
          setApplicationData(data);
          setApplicationFormData(data.application_data);
          setShowLoader(false);
        } catch (e) {
          errorContext.setError(e, true);
          setShowLoader(false);
        }
      }
    }

    fetchApplication();
  }, [match.params.uid]);

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

      if (match.params.uid) {
        setPageState(newState);
        history.push(`/register/${match.params.uid}/${newState.curr}`);
      }
    }
  };

  const onFinish = async values => {
    const formData = { ...applicationFormData, ...values };
    setShowLoader(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      // If Application doesn't exist
      if (!applicationData._id) {
        const res = await dashboardService.createApplication({
          user_id: user.accountIdentifier,
          status: 'Drafted',
          application_data: formData,
        });
        setApplicationFormData(formData);
        setApplicationData(res);
        setShowLoader(false);
        goForward(res._id);
      } else {
        const res = await dashboardService.updateApplication(match.params.uid, {
          status: 'Drafted',
          application_data: formData,
          applicationId: applicationData.applicationId,
        });
        setApplicationFormData(formData);
        setApplicationData(res);
        setShowLoader(false);
        goForward(match.params.uid);
      }
    } catch (e) {
      setShowLoader(false);
      errorContext.setError(e, true);
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

  return (
    <Fragment>
      {(showLoader || (formSchema && formSchema.length === 0)) && <CustomSpinner />}
      {!showLoader && formSchema && formSchema.length > 0 && (
        <DashboardPage
          pageState={pageState}
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
