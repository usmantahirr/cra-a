// DEV

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
  scopes: ['openid', 'profile'],
  // scopes: ['https://asadsystemsltdb2c.onmicrosoft.com/api'],
};

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: ['https://asadsystemsltdb2c.onmicrosoft.com/api/demo.read'],
};

export const b2cPolicies = {
  names: {
    SignIn: 'B2C_1_asdsigninb2cflow',
    forgotPassword: 'B2C_1_reset_password_b2c',
  },
  authorities: {
    SignIn: {
      authority: 'https://asadsystemsltdb2c.b2clogin.com/asadsystemsltdb2c.onmicrosoft.com/B2C_1_asdsigninb2cflow',
    },
    forgotPassword: {
      authority: 'https://asadsystemsltdb2c.b2clogin.com/asadsystemsltdb2c.onmicrosoft.com/B2C_1_reset_password_b2c',
    },
  },
};

// QA

// export const msalConfig = {
//   auth: {
//     clientId: 'ddf0e524-e719-4f21-90ef-8ff1a7ae0e58',
//     authority: 'https://purehealthpoc.b2clogin.com/purehealthpoc.onmicrosoft.com/B2C_1_purehealth_signin',
//     validateAuthority: false,
//   },
//   cache: {
//     cacheLocation: 'localStorage', // This configures where your cache will be stored
//     storeAuthStateInCookie: true, // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
//   },
// };

// export const loginRequest = {
//   scopes: ['openid', 'profile'],
//   // scopes: ['https://asadsystemsltdb2c.onmicrosoft.com/api'],
// };

// // Add here scopes for access token to be used at the API endpoints.
// export const tokenRequest = {
//   scopes: ['https://purehealthpoc.onmicrosoft.com/api/demo.read'],
// };

// export const b2cPolicies = {
//   names: {
//     SignIn: 'B2C_1_purehealth_signin',
//     forgotPassword: 'B2C_1_purehealth-password-reset',
//   },
//   authorities: {
//     SignIn: {
//       authority: 'https://purehealthpoc.b2clogin.com/purehealthpoc.onmicrosoft.com/B2C_1_purehealth_signin',
//     },
//     forgotPassword: {
//       authority: 'https://purehealthpoc.b2clogin.com/purehealthpoc.onmicrosoft.com/B2C_1_purehealth-password-reset',
//     },
//   },
// };
