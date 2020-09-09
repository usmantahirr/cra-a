import API, { contentType } from '../../../api';
import { API_AUTH_BASE_URL } from '../../../config';
import { AUTH_SEND_OTP, AUTH_RESEND_OTP, AUTH_VERIFY_OTP, AUTH_RESEND_PIN } from '../../../api/endpoints';

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
}
export default new AuthService();
