// DEV

export const API_BASE_URL = 'https://purehealthpoc1.azurewebsites.net/api/';
export const API_BASE_URL3 = 'https://purehealthpoc2.azurewebsites.net/api/';
export const API_AUTH_BASE_URL = 'https://purehealth.azurewebsites.net/api/';

// QA

// export const API_BASE_URL = 'https://purehealth-dynamics-forms-file-upload.azurewebsites.net/api/';
// export const API_BASE_URL3 = 'https://purehealth-app-submission.azurewebsites.net/api/';
// export const API_AUTH_BASE_URL = 'https://purehealth-user-registration.azurewebsites.net/api/';

export const LOGGING = {
  enabled: true,
  loglevel: 'error', // 1) error, 2) warn, 3) info
};

export const AUTH_PAGE = '/account/login';
export const SIGNUP_PAGE = '/account/signup';
export const FORGOT_PASSWORD_PAGE = '/account/forgot-password';
export const APPLICATION_HOME = '/register';
export const CHANGE_PASSWORD = '/change-password';
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

export const MAP_KEY = 'AIzaSyC5wzEBHV_vzzybukHvJDqp0XsglftJvUY';

export const ContextMenuCmd = {
  edit: 'edit',
  view: 'view',
};

export const ApplicationFormUrl = '/register/{0}';
export const ApplicationFormDetailUrl = '/manage-application/view/{0}';

export const DATE_FORMATE = 'YYYY-MM-DD';
