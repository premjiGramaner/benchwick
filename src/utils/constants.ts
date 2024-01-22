const url = process.env.name === 'prod' ? window.location.origin : 'http://localhost:5001';
const socket = process.env.name === 'prod' ? `ws${window.location.origin.slice(window.location.origin.lastIndexOf('://'))}` : 'ws://localhost:5003/';
export const API_URL = {
  wss: socket,
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