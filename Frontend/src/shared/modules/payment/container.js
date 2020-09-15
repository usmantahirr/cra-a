import React, { useContext, useEffect, useState } from 'react';
import qs from 'querystring';
import { Modal } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';

import { getPaymentUrl, getPaymentStatus } from './service';
import ErrorContext from '../error/context';
import CustomSpinner from '../../atoms/spinner';
import Button from '../../atoms/buttons';

const structure = {
  action: 'SALE',
  amount: {},
  merchant_attributes: {
    redirect_url: 'https://usmanstorage.z23.web.core.windows.net/',
    skip_confirmation_page: true,
  },
};

const getUserObject = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

const PaymentContainer = props => {
  const [url, setUrl] = useState('');
  const [refCode, setRefCode] = useState('');
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [gettingStatus, setGettingStatus] = useState(false);
  const [status, setStatus] = useState();
  const [error, setError] = useState('');

  const errorContext = useContext(ErrorContext);
  const user = getUserObject();

  const history = useHistory();
  const match = useRouteMatch();

  const { applicationId } = props;

  useEffect(() => {
    const {
      applicationFormData: { lab },
    } = props;

    if (lab && lab.currency && lab.feesAmount) {
      structure.amount.currency_code = lab.currency;
      structure.amount.value =
        lab.feesAmount.indexOf('.') === -1 ? `${lab.feesAmount}00` : lab.feesAmount.replace('.', '');
    }

    if (lab && user && user.idTokenClaims && user.idTokenClaims.emails && user.idTokenClaims.emails[0]) {
      getPaymentUrl({
        ...structure,
        email_address: user.idTokenClaims.emails[0],
      })
        .then(data => {
          setUrl(data);
          setError('');
        })
        .catch(e => {
          setError(e.message);
          errorContext.setError(e, true);
        });
    } else {
      setError('No Labs Found');
    }
  }, []);

  useEffect(() => {
    async function fetchPaymentStatus() {
      if (paymentProcessed && refCode && applicationId) {
        setGettingStatus(true);
        try {
          const query = {
            ref: refCode,
            applicationId,
            userId: user.accountIdentifier,
          };
          const res = await getPaymentStatus(query);
          setStatus(res);
          setGettingStatus(false);
        } catch (e) {
          setGettingStatus(false);
        }
      }
    }

    fetchPaymentStatus();
  }, [refCode, paymentProcessed, applicationId]);

  window.onmessage = e => {
    if (e && e.data && e.data.ref) {
      const ref = qs.parse(e.data.ref);
      setRefCode(ref['?ref']);
      setPaymentProcessed(true);
    }
  };

  if (error) {
    return <h2>Something went wrong</h2>;
  }

  if (!url) {
    return <CustomSpinner />;
  }

  if (paymentProcessed && refCode) {
    if (gettingStatus) {
      return <div>Fetching Status...</div>;
    }
    if (status && status.status === 'SUCCESS') {
      return (
        <Modal
          visible
          centered
          destroyOnClose
          closable={false}
          footer={null}
          className="custom-popup text-popup"
          width={590}
        >
          <div className="custompopup-text">Submitted Successfully For Test</div>
          <div className="custom-content-holder">
            <div className="text-holder">
              <h3 className="title">Medical Test REGISTRATION Application NO. {applicationId}</h3>
              <p>
                Kindly visit the selected facility to proceed with the test. a copy of the application has been emailed
                to you on your email address. {user.idTokenClaims.emails[0]} and downloaded on your system. please bring
                a copy of your application to the appointment.
              </p>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="ant-btn-block ant-btn-lg"
              onClick={() => history.push('/register')}
            >
              Go back to home page
            </Button>
          </div>
        </Modal>
      );
    }

    return (
      <Modal
        visible
        centered
        destroyOnClose
        closable={false}
        footer={null}
        className="custom-popup text-popup"
        width={590}
      >
        <div className="custompopup-text">Payment Failed</div>
        <div className="custom-content-holder">
          <div className="text-holder">
            <h3 className="title">Medical Test REGISTRATION Application NO. {applicationId}</h3>
            <p>Please retry the payment</p>
          </div>
          <Button
            type="primary"
            className="ant-btn-block ant-btn-lg"
            onClick={e => {
              e.preventDefault();
              let step = match.params.stepId;
              step = parseInt(step, 10) - 1;
              setError('');
              history.push(`/register/${match.params.uid}/${step}`);
              window.location.reload(true);
            }}
          >
            Take a step back
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <div>
      <iframe
        title="payment"
        src={url}
        style={{
          height: '-webkit-fill-available',
          width: '100%',
        }}
      />
    </div>
  );
};

export default PaymentContainer;
