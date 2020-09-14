import API from '../../../api';
import { PAYMENT_INTERNATIONAL, PAYMENT_STATUS } from '../../../api/endpoints';
import { API_BASE_URL3 } from '../../../config';
import errorObject from '../../../api/errorObject';

// eslint-disable-next-line import/prefer-default-export
export const getPaymentUrl = data => {
  const api = new API();

  return api
    .post(`${API_BASE_URL3}${PAYMENT_INTERNATIONAL}`, data)
    .then(res => res.data)
    .catch(e => {
      throw errorObject(e);
    });
};

export const getPaymentStatus = data => {
  const api = new API();

  return api
    .post(`${API_BASE_URL3}${PAYMENT_STATUS}`, data)
    .then(res => res.data)
    .catch(e => {
      throw errorObject(e);
    });
};
