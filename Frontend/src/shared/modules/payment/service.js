import API from '../../../api';
import { PAYMENT_INTERNATIONAL } from '../../../api/endpoints';
import { API_BASE_URL3 } from '../../../config';
import errorObject from '../../../api/errorObject';

// eslint-disable-next-line import/prefer-default-export
export const getPaymentUrl = () => {
  const api = new API();

  return api
    .post(`${API_BASE_URL3}${PAYMENT_INTERNATIONAL}`)
    .then(res => res)
    .catch(e => {
      throw errorObject(e);
    });
};
