import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import MSALService from './services/msal.service';
import { APPLICATION_HOME } from '../../config';

const AuthContainer = ({ history }) => {
  useEffect(() => {
    async function fetchToken() {
      const token = await MSALService.fetchAccessToken();
      if (token) {
        const user = MSALService.getUser();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        history.push(APPLICATION_HOME);
      }
    }
    fetchToken();
  }, []);

  return null;
};

export default withRouter(AuthContainer);
