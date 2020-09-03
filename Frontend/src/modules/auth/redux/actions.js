import SIGN_IN from './actionTypes';
import httpClient from '../../../api/index';

export const SignIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const Login = payload => {
  return async dispatch => {
    const response = await httpClient.post('url', payload);
    // check response status
    // TODO We have to save things to local storage too.
    dispatch({
      type: SIGN_IN,
      payload: response.data,
    });
  };
};
