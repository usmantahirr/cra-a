import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthContextContainer from './modules/auth/contextContainer';

import Routes from './routes';
import Notification from './shared/modules/notification';
import ErrorBoundary from './shared/modules/error/ErrorBoundry';
// import authService from './modules/auth/services/auth.service';

function App() {
  // useEffect(() => {
  //   authService.fetchAccessToken();
  //   // .then(response => {
  //   //    console.log('token:', response);
  //   // });
  //   // const user = authService.getUser();
  //   // console.log(user);
  // }, []);

  return (
    <Notification>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthContextContainer>
            <Routes />
          </AuthContextContainer>
        </BrowserRouter>
      </ErrorBoundary>
    </Notification>
  );
}

export default App;
