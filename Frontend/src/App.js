import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthContextContainer from './modules/auth/contextContainer';

import Routes from './routes';
import Notification from './shared/modules/notification';
import ErrorBoundary from './shared/modules/error/ErrorBoundry';
import Language from './shared/modules/language';

function App() {
  return (
    <Language>
      <Notification>
        <ErrorBoundary>
          <BrowserRouter>
            <AuthContextContainer>
              <Routes />
            </AuthContextContainer>
          </BrowserRouter>
        </ErrorBoundary>
      </Notification>
    </Language>
  );
}

export default App;
