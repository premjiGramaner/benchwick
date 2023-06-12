import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { URLS } from '@Utils/constants'
import actions from '@Store/logIn/actions'
import { getAuthToken, IS_USER_AUTHENTICATED } from '@Utils/storage'
import {
  IDefaultPageProps,
  ILoginPageProps,
  IReducerState,
} from '@Utils/interface'
import TextBox from '@Components/TextBox/TextBox'
import schema from '@Utils/schema/loginValidation'
import googlePlus from '@Assets/svg/google-plus.svg'
const LoginComponent: React.FC<IDefaultPageProps & ILoginPageProps> = props => {
  const result = useSelector((state: IReducerState) => state.loginReducer)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [logIn, setLogIn] = useState<string>('LOGIN')
  const [spin, setSpin] = useState<string>('')
  // const { status, error } = useSelector(
  //   (state: ILoginState) => state?.loginReducer
  // )
  const { users: totalUsers, textCount } = result

  const handleLoginSubmit = data => {
    IS_USER_AUTHENTICATED(true)
    props.navigate(URLS.DASHBOARD)
    setLogIn('')
    setSpin('spinner-border')
  }
  const onShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { user: '', password: '' },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      handleLoginSubmit(values)
    },
  })
  return (
    <div className="bg-login vh-100">
      <section className="container d-flex w-100 align-items-center justify-content-xl-start justify-content-center h-100">
        <div className="row w-100 justify-content-xl-start justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-lg-5 col-xl-5 col-xxl-4">
            <div className="card rounded p-4 mt-0 card-width">
              <div className="card-header px-2 pt-4 pb-5 bg-transparent border-0">
                <figure className="mb-0 pb-3">
                  {/* <img src={logo} /> */}
                </figure>
                <h1 className="px-5 py-0 fw-bold mb-0">Logo envision</h1>
              </div>
              <div className="card-body card-content px-5 py-0">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <TextBox
                    type="text"
                    name="user"
                    value={values.user}
                    labelname="Username"
                    placeholder="Please enter the user name"
                    handleChange={handleChange}
                  />

                  {touched.user && errors.user ? (
                    <p className="form-error">
                      <i className="fa fa-info-circle"></i>
                      <span className="error-msg-txt">{errors.user}</span>
                    </p>
                  ) : null}

                  <TextBox
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    labelname="Password"
                    placeholder="********"
                    handleChange={handleChange}
                    icon={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
                    handleIconClick={onShowPassword}
                  />

                  {touched.password && errors.password ? (
                    <p className="form-error">
                      <i className="fa fa-info-circle"></i>
                      <span className="error-msg-txt">{errors.password}</span>
                    </p>
                  ) : null}

                  <div className="d-flex align-items-center justify-content-between ">
                    <div className="text-color3 d-flex align-items-center cursor-pointer remember-me-container">
                      <input
                        type="radio"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        id="remember-me-checkbox"
                        className="round-checkbox"
                      />

                      <label
                        className="fs-14 mt-3 ps-2 text-color3"
                        onClick={() => setRememberMe(!rememberMe)}
                      >
                        Remember me.
                      </label>
                    </div>
                    <span className="fs-14 text-decoration-none text-color3 cursor-pointer">
                      Forget Password?
                    </span>
                  </div>
                  <div className="pt-4 px-2 d-flex text-center">
                    <div className="mt-3 straight-line " />
                    <div className="mt-1 px-2 fs-14">Or</div>
                    <div className="mt-3 straight-line " />
                  </div>
                  <div className="pb-0 pt-4 bg-transparent d-flex text-center">
                    <button className="btn btn-primary login-btn">
                      <img
                        className="px-2 mb-1"
                        src={googlePlus}
                        alt="google image"
                      />
                      Login with Google
                    </button>
                  </div>
                  <div className="pb-0 pt-4 bg-transparent d-flex text-center">
                    <button className="btn btn-primary login-btn upper-case">
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <div className="pb-2 pt-4 text-center">
                  Don’t have an account?
                  <a className="px-1 mt-1" href="#" type="file">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <p className="mb-0 text-white fs-12 pt-3 mt-2 mb-1">
              © 2023 Benchwick ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginComponent
