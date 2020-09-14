import API, { contentType } from '../../../api';
import { API_AUTH_BASE_URL } from '../../../config';
import { CHANGE_PASSWORD } from '../../../api/endpoints';

class UserService {
  constructor() {
    this.userId =
      JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).accountIdentifier;
    this.http = new API({
      headers: {
        contentType: contentType.json,
        userId: this.userId,
      },
      baseURL: API_AUTH_BASE_URL,
    });
  }

  changePassword = payload => {
    return this.http.post(CHANGE_PASSWORD, payload);
  };
}
export default new UserService();
