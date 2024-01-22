import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { URLS } from '@Utils/constants'
import {
  IDefaultPageProps,
  ILoginPageProps,
} from '@Utils/interface'
import TextBox from '@Components/TextBox/TextBox'
import schema from '@Utils/schema/signUpValidation'
import { EnvLogo } from '@Assets/images'
import { signUp } from 'src/reducers/signUpReducer'
import { LoginWithGoogleButton } from '@Pages/Login/LoginWithGoogleButton'

const SignupComponent: React.FC<
  IDefaultPageProps & ILoginPageProps
> = props => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [validating, setValidating] = useState(false);

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { user: '', email: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      handleSignUpSubmit(values)
    },
  })

  const dispatch = useDispatch();
  const handleSignUpSubmit = (data) => {
    dispatch(
      signUp({
        body: {
          email: data.email,
          name: data.user,
          password: data.password,
          role: '', // optional - if empty consider as an user or add admin
        },
        navigation: props.navigate
      })
    )
  };

  const isFormValid = () => {
    return (values.user && values.email && values.password?.length > 5 && values.confirmPassword?.length > 5 && (values.password === values.confirmPassword))
  }

  return (
    <div className="bg-signup vh-100">
      <section className="container d-flex w-100 align-items-center justify-content-xl-start justify-content-center h-100">
        <div className="row justify-content-xl-start justify-content-center card-signup">
          <div>
            <div className="card rounded mt-5 card-width">
              <div className="card-header px-2 bg-transparent border-0">
                <figure className="mb-0 pb-3">
                  <img src={EnvLogo} alt="envision logo" className='app-logo' />
                </figure>
              </div>
              <div className="card-body card-content px-4 py-2">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <TextBox
                    type="text"
                    name="user"
                    value={values.user}
                    labelname="Username"
                    placeholder=""
                    handlechange={handleChange}
                    errorMessageComponent={(
                      touched.user && errors.user ? (
                        <p className="form-error">
                          <i className="fa fa-info-circle"></i>
                          <span className="error-msg-txt">{errors.user}</span>
                        </p>
                      ) : null
                    )}
                  />

                  <TextBox
                    type="text"
                    name="email"
                    value={values.email}
                    labelname="Email Address"
                    placeholder=""
                    handlechange={handleChange}
                    errorMessageComponent={(touched.email && errors.email ? (
                      <p className="form-error">
                        <i className="fa fa-info-circle"></i>
                        <span className="error-msg-txt">{errors.email}</span>
                      </p>
                    ) : null)}
                  />

                  <TextBox
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    labelname="password"
                    autoComplete="username"
                    placeholder=""
                    handlechange={handleChange}
                    icon={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
                    handleIconClick={() => setShowPassword(!showPassword)}
                    errorMessageComponent={(touched.password && errors.password ? (
                      <p className="form-error">
                        <i className="fa fa-info-circle"></i>
                        <span className="error-msg-txt">{errors.password}</span>
                      </p>
                    ) : null)}
                  />

                  <TextBox
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    labelname="Confirm Password"
                    autoComplete="username"
                    placeholder=""
                    handlechange={handleChange}
                    errorMessageComponent={(touched.confirmPassword && errors.confirmPassword ? (
                      <p className="form-error">
                        <i className="fa fa-info-circle"></i>
                        <span className="error-msg-txt">
                          {errors.confirmPassword}
                        </span>
                      </p>
                    ) : null)}
                  />

                  <div className="pb-0 pt-4 bg-transparent d-flex text-center">
                    <button className="btn btn-primary login-btn upper-case" disabled={!isFormValid()}>
                      SIGNUP
                    </button>
                  </div>
                  <div className="pt-4 px-2 d-flex text-center">
                    <div className="mt-3 straight-line " />
                    <div className="mt-1 px-2 fs-14">Or</div>
                    <div className="mt-3 straight-line " />
                  </div>
                  <div className="pb-0 mt-1 mb-3 bg-transparent d-flex text-center">
                    <LoginWithGoogleButton {...props} {...{ validating, setValidating }} />
                  </div>
                </form>
                <div className="pb-3 mb-2 pt-4 text-center">
                  have an account?
                  <a className="px-1 mt-1" onClick={() => props.navigate(URLS.LOGIN)}>
                    Login
                  </a>
                </div>
              </div>
            </div>
            <p className="text-white fs-12 pt-3 mt-1 mb-4">
              © {new Date().getFullYear()} ENVISION Engine ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </section>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default SignupComponent
