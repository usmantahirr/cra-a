import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthContextContainer from './modules/auth/contextContainer';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthContextContainer>
        <Routes />
      </AuthContextContainer>
    </BrowserRouter>
  );
}

export default App;
