import React, { useEffect } from 'react';
import Logger from '../logger';
import { getPaymentUrl } from './service';

const structure = {
  action: 'SALE',
  amount: {
    currency_code: 'AED',
    value: '175',
  },
  merchant_attributes: {
    redirect_url: 'http://localhost:3000/payment-redirect',
    skip_confirmation_page: true,
  },
};

const getUserIdentifier = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user).accountIdentifier;
};

const PaymentContainer = props => {
  useEffect(() => {
    Logger.info(props);
    getPaymentUrl({
      ...structure,
      email_address: `${getUserIdentifier()}@email.com`,
    })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }, []);

  /**
   * 0) fix url at top to get data
   * 1) Read user data from state (redux)
   * 2) fetch payment link from service
   * 3) show iFrame
   * 4) on payment success, redirect it to our own page
   * 5) Check if the payment passed through or not, if yes, show payment success
   */
  return <div>This is PaymentContainer</div>;
};

export default PaymentContainer;
