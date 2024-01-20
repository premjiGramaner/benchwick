const url = process.env.name === 'prod' ? window.location.origin : 'http://localhost:5001';
export const API_URL = {
  wss: 'ws://localhost:5003/',
  host: url,
  baseURL: `${url}/api`,
}

export const STORAGE_KEY = {
  USER_KEY: 'userKey',
  AUTH_TOKEN: 'accessToken',
  IS_USER_AUTHENTICATED: 'is-user-auth',
  USER_INFO: 'user-info',
  LOGGED_USER_NAME: 'logged-user-name'
}

export const enum URLS {
  DEFAULT = '/',
  LOGIN = '/login',
  PAGE_NOT_FOUND = '*',
  DASHBOARD = '/dashboard',
  VIEWHISTORY = '/viewhistory',
  SIGNUP = '/signup',
  FORGOTPASSWORD = '/forgotpassword',
  RESETPASSWORD = '/resetPassword',
}