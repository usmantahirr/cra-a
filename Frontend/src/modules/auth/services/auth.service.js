import * as Msal from 'msal';
import { msalConfig, loginRequest, tokenRequest, b2cPolicies } from './authConfig';
// todo: code clean up
class AuthService {
  accessToken = null;

  constructor() {
    this.userAgentApplication = new Msal.UserAgentApplication(msalConfig);
    this.userAgentApplication.handleRedirectCallback(this.authRedirectCallBack);
  }

  fetchAccessToken = () => {
    const accessTokenRequest = {
      scopes: ['https://asadsystemsltdb2c.onmicrosoft.com/api/demo.read'],
    };
    return this.userAgentApplication
      .acquireTokenSilent(accessTokenRequest)
      .then(accessTokenResponse => accessTokenResponse.accessToken)
      .catch(error => {
        if (error.errorMessage.indexOf('interaction_required') !== -1) {
          this.userAgentApplication.acquireTokenRedirect(accessTokenRequest);
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
          this.userAgentApplication.loginRedirect(b2cPolicies.authorities.forgotPassword);
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
      response.idToken.claims.acr &&
      response.idToken.claims.acr !== b2cPolicies.names.signUpSignIn
    ) {
      this.userAgentApplication.logout();
    } else if (
      response.tokenType === 'id_token' &&
      response.idToken.claims.acr &&
      response.idToken.claims.acr === b2cPolicies.names.signUpSignIn
    ) {
      this.userAgentApplication.getAccount();
      // if (this.userAgentApplication.getAccount()) {
      //     // updateUI();
      // }
    } else if (response.tokenType === 'access_token') {
      this.accessToken = response.accessToken;
    }
  }

  login() {
    this.userAgentApplication.loginRedirect(loginRequest);
  }

  // sign-out the user
  logout() {
    // Removes all sessions, need to call AAD endpoint to do full logout
    this.userAgentApplication.logout();
  }

  // main method to get token with redirect flow
  getTokenRedirect(request) {
    return this.userAgentApplication
      .acquireTokenSilent(request)
      .then(response => {
        if (response.accessToken) {
          this.accessToken = response.accessToken;
          if (this.accessToken) {
            try {
              // callApiWithAccessToken(apiConfig.webApi, this.accessToken);
            } catch (err) {
              // do something
            }
          }
        }
      })
      .catch(error => {
        // fallback to interaction when silent call fails
        // return this.userAgentApplication.acquireTokenRedirect(request);
        if (error.errorMessage.indexOf('interaction_required') !== -1) {
          this.userAgentApplication.acquireTokenRedirect(tokenRequest);
        } else {
          this.login();
        }
      });
  }

  // calls the resource API with the token
  passTokenToApi() {
    if (!this.accessToken) {
      this.getTokenRedirect(tokenRequest);
    } else {
      try {
        // callApiWithAccessToken(apiConfig.webApi, this.accessToken);
      } catch (err) {
        // do something
      }
    }
  }
}
const authService = new AuthService();
export default authService;
