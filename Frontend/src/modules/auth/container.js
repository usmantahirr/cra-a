import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import MSALService from './services/msal.service';
import { APPLICATION_HOME } from '../../config';

const AuthContainer = ({ history }) => {
  useEffect(() => {
    async function fetchToken() {
      const idToken = localStorage.getItem('id_token');
      if (idToken) {
        const accessToken = await MSALService.fetchAccessToken();
        if (accessToken) {
          const user = MSALService.getUser();
          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          history.push(APPLICATION_HOME);
        }
      } else {
        MSALService.login();
      }
    }
    fetchToken();
  }, []);

  return null;
};

export default withRouter(AuthContainer);
