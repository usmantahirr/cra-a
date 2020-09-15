import API, { contentType } from '../../../api';
import { API_AUTH_BASE_URL } from '../../../config';
import {
  AUTH_SEND_OTP,
  AUTH_RESEND_OTP,
  AUTH_VERIFY_OTP,
  AUTH_RESEND_PIN,
  FORGOT_PASSWORD_SEND_PIN,
  FORGOT_PASSWORD_RESEND_PIN,
  FORGOT_PASSWORD_VERIFY_PIN,
  RESET_PASSWORD,
  LOGIN,
} from '../../../api/endpoints';

class AuthService {
  constructor() {
    this.http = new API({
      headers: { contentType: contentType.json },
      baseURL: API_AUTH_BASE_URL,
    });
  }

  sendOTP = payload => {
    return this.http.post(AUTH_SEND_OTP, payload);
  };

  resendOTP = payload => {
    return this.http.post(AUTH_RESEND_OTP, payload);
  };

  resendPin = payload => {
    return this.http.post(AUTH_RESEND_PIN, payload);
  };

  verifyOTP = payload => {
    return this.http.post(AUTH_VERIFY_OTP, payload);
  };

  sendForgotPasswordPin = payload => {
    return this.http.post(FORGOT_PASSWORD_SEND_PIN, payload);
  };

  resendForgotPasswordPin = payload => {
    return this.http.post(FORGOT_PASSWORD_RESEND_PIN, payload);
  };

  verifyForgotPasswordPin = payload => {
    return this.http.post(FORGOT_PASSWORD_VERIFY_PIN, payload);
  };

  resetPassword = payload => {
    return this.http.post(RESET_PASSWORD, payload);
  };

  login = payload => {
    return this.http.post(LOGIN, payload);
  };
}
export default new AuthService();
