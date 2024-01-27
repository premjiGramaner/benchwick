import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL, STORAGE_KEY } from '@Utils/constants'

const instance = axios.create({
  baseURL: API_URL.baseURL,
  timeout: 0, // no timeout
})
const config = {
  headers: { 'content-type': 'multipart/form-data' },
}
const api = {
  login: {
    post: arg => instance.post('/login', arg),
    google_sign_in: arg => instance.post('/login/google-signin', arg),
    logout: () => instance.get('/user/logout'),
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
  imageEnvision: {
    post: (arg, _config?) => instance.post('/image/image-envision', arg, { ...config, ...(_config || {}) }),
  },
  saveEnvision: {
    post: arg => instance.post('/image/save-envision', arg, config),
  },
  getEnvisionVariations: {
    get: arg => instance.get(`/image/get-envision-variants/${arg}`),
  },
  userHistory: {
    get: () => instance.get('/user/user-history'),
  },
  deleteHistory: {
    delete: (arg: number) => instance.delete(`/user/delete-history/${arg}`),
  },
}

const getAuthHeader = async () => {
  try {
    const accessToken = sessionStorage[STORAGE_KEY.AUTH_TOKEN]
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
