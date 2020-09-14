import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

const PaymentRedirect = () => {
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();

  console.log(match, location, history);
  return <div>This is payment redirect page</div>;
};

export default PaymentRedirect;
