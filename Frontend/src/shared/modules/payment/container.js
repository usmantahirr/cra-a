import React, { useContext, useEffect, useState } from 'react';
import qs from 'querystring';
import { getPaymentUrl } from './service';
import ErrorContext from '../error/context';
import CustomSpinner from '../../atoms/spinner';

const structure = {
  action: 'SALE',
  amount: {
    currency_code: 'AED',
    value: '175',
  },
  merchant_attributes: {
    redirect_url: 'https://usmanstorage.z23.web.core.windows.net/',
    skip_confirmation_page: true,
  },
};

const getUserIdentifier = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

const PaymentContainer = props => {
  const [url, setUrl] = useState('');
  const [refCode, setRefCode] = useState('');
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const errorContext = useContext(ErrorContext);

  useEffect(() => {
    const user = getUserIdentifier();
    console.log(props);

    getPaymentUrl({
      ...structure,
      email_address: user.idTokenClaims.emails[0],
    })
      .then(data => setUrl(data))
      .catch(e => errorContext.setError(e, true));
  }, []);

  window.onmessage = function(e) {
    if (e && e.data && e.data.ref) {
      const ref = qs.parse(e.data.ref);
      setRefCode(ref['?ref']);
      setPaymentProcessed(true);
    }
  };

  if (!url) {
    return <CustomSpinner />;
  }

  if (paymentProcessed && refCode) {
    return <div>Payment Complete</div>;
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
