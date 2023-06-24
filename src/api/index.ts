import { forgotPassword } from './../reducers/forgotPasswordReducer'
import { IS_USER_AUTHENTICATED } from './../utils/storage/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL, STORAGE_KEY } from '@Utils/constants'

const instance = axios.create({
  baseURL: API_URL.baseURL,
  timeout: 0, // no timeout
})

const api = {
  login: {
    post: arg => instance.post('/login', arg),
  },
  forgotPassword: {
    post: arg => instance.post('/login/forgot-password', arg),
  },
  resetPassword: {
    post: arg => instance.post('/login/password-update', arg),
  },
  signUp: {
    post: arg => instance.post('/login/signup', arg),
  },
  // viewTable:{
  //   get:(arg)=>instance.get(`users?${arg}`)
  // }
}

const getAuthHeader = async () => {
  try {
    const accessToken = localStorage[STORAGE_KEY.AUTH_TOKEN]
    return accessToken ? `Bearer ${accessToken}` : undefined
  } catch (error) {
    console.error('There was an error token:', error)
    return undefined
  }
}

export const tokenRequestInterceptor = async (req: AxiosRequestConfig) => {
  return {
    ...req,
    headers: {
      ...req.headers,
      Authorization: await getAuthHeader(),
    },
  }
}

// If you want any optimization or custom response pleas make changes here
const responseSuccessHandler = (response: AxiosResponse<any>) => response

/**
 * Todo
 * When the API needs any custom handler on the API error code update here
 */
const responseErrorHandler = (error: any) => {
  if (error?.response?.status === 401) {
    localStorage.clear()
    window.location.reload()
  }

  return Promise.reject(error)
}

instance.interceptors.request.use(tokenRequestInterceptor)

instance.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error)
)

export default { instance, ...api }
