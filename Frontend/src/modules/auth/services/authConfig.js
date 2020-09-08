// todo: code clean up

export const msalConfig = {
  auth: {
    clientId: '956f8f5e-41c5-465f-b784-3a33ae4a14e1',
    authority: 'https://asadsystemsltdb2c.b2clogin.com/asadsystemsltdb2c.onmicrosoft.com/B2C_1_asdsigninb2cflow',
    validateAuthority: false,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
  },
};

export const loginRequest = {
  // scopes: ["openid", "profile"],
  scopes: ['https://asadsystemsltdb2c.onmicrosoft.com/api'],
  // loginHint: "someone@contoso.com"
};

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: ['https://asadsystemsltdb2c.onmicrosoft.com/api'],
};

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_asdsigninb2cflow',
    forgotPassword: 'b2c_1_reset',
  },
  authorities: {
    signUpSignIn: {
      // authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi",
      authority: 'https://asadsystemsltdb2c.b2clogin.com/asadsystemsltdb2c.onmicrosoft.com/B2C_1_asdsigninb2cflow',
    },
    forgotPassword: {
      authority: 'https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_reset',
    },
  },
};
