export const API_URL = {
  baseURL: 'http://localhost:5001/api',
}

export const STORAGE_KEY = {
  AUTH_TOKEN: 'accessToken',
  IS_USER_AUTHENTICATED: 'is-user-auth',
  USER_INFO: 'user-info',
}

export const enum URLS {
  DEFAULT = '/',
  LOGIN = '/login',
  PAGE_NOT_FOUND = '*',
  DASHBOARD = '/dashboard',
  VIEWHISTORY = '/viewhistory',
  SIGNUP = '/signup',
  FORGOTPASSWORD = '/forgotpassword',
  RESETPASSWORD='/resetPassword',
}