import { IMenuItem } from '@Interface/index'
import { URLS } from '@Utils/constants'
import {
  LoginComponent,
  pageNotFound,
  SignupComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
} from '@Pages/index'

export default [
  {
    path: URLS.PAGE_NOT_FOUND,
    routeName: 'Page Not Found',
    component: pageNotFound,
    icon: '',
    permissions: [],
    children: [],
  },
  {
    path: URLS.DEFAULT,
    routeName: 'Default Component',
    component: LoginComponent,
    icon: '',
    permissions: [],
    children: [],
  },
  {
    path: URLS.LOGIN,
    routeName: 'Login Component',
    component: LoginComponent,
    icon: '',
    permissions: [],
    children: [],
  },
  {
    path: URLS.SIGNUP,
    routeName: 'Signup Component',
    component: SignupComponent,
    icon: '',
    permissions: [],
    children: [],
  },
  {
    path: URLS.FORGOTPASSWORD,
    routeName: 'ForgotPassword Component',
    component: ForgotPasswordComponent,
    icon: '',
    permissions: [],
    children: [],
  },
  {
    path: URLS.RESETPASSWORD,
    routeName: 'ResetPassword Component',
    component: ResetPasswordComponent,
    icon: '',
    permissions: [],
    children: [],
  },
] as IMenuItem[]
