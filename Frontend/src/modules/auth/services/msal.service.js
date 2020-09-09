import * as Msal from 'msal';
import { msalConfig, loginRequest, tokenRequest, b2cPolicies } from '../config/msalConfig';

class MSALService {
  accessToken = null;

  constructor() {
    this.userAgentApplication = new Msal.UserAgentApplication(msalConfig);
    this.authRedirectCallBack = this.authRedirectCallBack.bind(this);
    this.userAgentApplication.handleRedirectCallback(this.authRedirectCallBack);
  }

  fetchAccessToken = () => {
    return this.userAgentApplication
      .acquireTokenSilent(tokenRequest)
      .then(accessTokenResponse => accessTokenResponse.accessToken)
      .catch(error => {
        if (error.errorMessage.indexOf('interaction_required') !== -1) {
          this.userAgentApplication.acquireTokenRedirect(tokenRequest);
        } else {
          this.login();
        }
      });
  };

  getUser = () => {
    return this.userAgentApplication.getAccount();
  };

  authRedirectCallBack(error, response) {
    // Error handling
    if (error) {
      // Check for forgot password error
      // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
      if (error.errorMessage.indexOf('AADB2C90118') > -1) {
        try {
          // Password reset policy/authority
          this.userAgentApplication.loginRedirect({
            authority:
              'https://asadsystemsltdb2c.b2clogin.com/asadsystemsltdb2c.onmicrosoft.com/B2C_1_reset_password_b2c',
          });
        } catch (err) {
          // do something
        }
      }
    }
    // We need to reject id tokens that were not issued with the default sign-in policy.
    // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
    // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
    else if (
      response.tokenType === 'id_token' &&
      response.idToken.claims.tfp &&
      response.idToken.claims.tfp !== b2cPolicies.names.SignIn
    ) {
      this.userAgentApplication.logout();
    } else if (
      response.tokenType === 'id_token' &&
      response.idToken.claims.tfp &&
      response.idToken.claims.tfp === b2cPolicies.names.SignIn
    ) {
      localStorage.setItem('id_token', response.idToken.rawIdToken);
    } else if (response.tokenType === 'access_token') {
      this.accessToken = response.accessToken;
    }
  }

  login() {
    this.userAgentApplication.loginRedirect(loginRequest);
  }

  logout() {
    this.userAgentApplication.logout();
  }
}
const service = new MSALService();
export default service;
