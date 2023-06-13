import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { URLS } from '@Utils/constants'
import {
  IDefaultPageProps,
  ILoginPageProps,
  IReducerState,
} from '@Utils/interface'
import TextBox from '@Components/TextBox/TextBox'
import schema from '@Utils/schema/signUpValidation'
import googlePlus from '@Assets/svg/google-plus.svg'
const SignupComponent: React.FC<
  IDefaultPageProps & ILoginPageProps
> = props => {
  const result = useSelector((state: IReducerState) => state.loginReducer)

  const handleSignUpSubmit = data => {
    // IS_USER_AUTHENTICATED(true)
    props.navigate(URLS.DASHBOARD)
  }

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { user: '', email: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      handleSignUpSubmit(values)
    },
  })
  return (
    <div className="bg-signup vh-100">
      <section className="container d-flex w-100 align-items-center justify-content-xl-start justify-content-center h-100">
        <div className="row justify-content-xl-start justify-content-center card-signup">
          <div>
            <div className="card rounded mt-5 card-width">
              <div className="card-header px-2 bg-transparent border-0">
                <figure className="mb-0 pb-3">
                  {/* <img src={logo} /> */}
                </figure>
                <h1 className="px-5 py-0 fw-bold mb-0">Logo envision</h1>
              </div>
              <div className="card-body card-content px-5 py-2">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <TextBox
                    type="text"
                    name="user"
                    value={values.user}
                    labelname="Name"
                    placeholder=""
                    handleChange={handleChange}
                  />

                  {touched.user && errors.user ? (
                    <p className="form-error">
                      <i className="fa fa-info-circle"></i>
                      <span className="error-msg-txt">{errors.user}</span>
                    </p>
                  ) : null}

                  <TextBox
                    type="text"
                    name="email"
                    value={values.email}
                    labelname="Email Address"
                    placeholder=""
                    handleChange={handleChange}
                  />

                  {touched.email && errors.email ? (
                    <p className="form-error">
                      <i className="fa fa-info-circle"></i>
                      <span className="error-msg-txt">{errors.email}</span>
                    </p>
                  ) : null}

                  <TextBox
                    type="text"
                    name="password"
                    value={values.password}
                    labelname="password"
                    placeholder=""
                    handleChange={handleChange}
                  />

                  {touched.password && errors.password ? (
                    <p className="form-error">
                      <i className="fa fa-info-circle"></i>
                      <span className="error-msg-txt">{errors.password}</span>
                    </p>
                  ) : null}

                  <TextBox
                    type="text"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    labelname="Confirm Password"
                    placeholder=""
                    handleChange={handleChange}
                  />

                  {touched.confirmPassword && errors.confirmPassword ? (
                    <p className="form-error">
                      <i className="fa fa-info-circle"></i>
                      <span className="error-msg-txt">
                        {errors.confirmPassword}
                      </span>
                    </p>
                  ) : null}

                  <div className="pb-0 pt-4 bg-transparent d-flex text-center">
                    <button className="btn btn-primary login-btn upper-case">
                      SIGNUP
                    </button>
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
                </form>
                <div className="pb-3 pt-4 text-center">
                  Don’t have an account?
                  <a className="px-1 mt-1" href="#" type="file">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <p className="text-white fs-12 pt-3 mt-1 mb-4">
              © 2023 Benchwick ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignupComponent