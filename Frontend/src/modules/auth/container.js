import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import authService from './services/auth.service';

const AuthContainer = ({ history }) => {
  useEffect(() => {
    async function fetchToken() {
      const token = await authService.fetchAccessToken();
      if (token) {
        const user = authService.getUser();
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        history.push('/');
      }
    }
    fetchToken();
  }, []);

  return null;
};

export default withRouter(AuthContainer);
