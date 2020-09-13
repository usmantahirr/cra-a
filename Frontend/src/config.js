export const API_BASE_URL = 'https://purehealthpoc.azurewebsites.net/api/';
export const API_BASE_URL2 = 'https://purehealthpoc.azurewebsites.net/api/';
export const API_BASE_URL3 = 'https://purehealthpoc2.azurewebsites.net/api/';
// export const API_AUTH_BASE_URL = 'https://purehealthuserregistration.azurewebsites.net/';
export const API_AUTH_BASE_URL = 'https://purehealth.azurewebsites.net/api/';

export const LOGGING = {
  enabled: true,
  loglevel: 'error', // 1) error, 2) warn, 3) info
};

export const AUTH_PAGE = '/account/login';
export const SIGNUP_PAGE = '/account/signup';
export const APPLICATION_HOME = '/register';
export const LOGGED_IN_HOME = APPLICATION_HOME;

export const STATE_SKIP_BY_COUNTRY = 'USA';

export const APPLICATION_STATUS_TYPES = {
  DRAFTED: 'Drafted',
  SUBMITTED: 'Submitted',
};

export const TEST_RESULT_TYPES = {
  NEGATIVE: 'Negative',
  REPEAT_SAMPLE: 'Repeat Sample',
  POSITIVE: 'Positive',
  BORDER_LINE: 'Border Line',
  IN_CONCLUSIVE: 'In-conclusive',
};
