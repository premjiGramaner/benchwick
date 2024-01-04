import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import jwt_decode from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { URLS } from '@Utils/constants'
import TextBox from '@Components/TextBox/TextBox'
import schema from '@Utils/schema/resetPasswordValidation'
import { resetPassword } from 'src/reducers/resetPasswordReducer'
import { EnvLogo } from '@Assets/images'

import { IDefaultPageProps } from '@Interface/PagesInterface'

const ResetPasswordComponent: React.FC<IDefaultPageProps> = props => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState<string>()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    try {
      const urlData = window.location.href
      const urlFormID = urlData.split('resetPassword?token=')
      const token = urlFormID[1]
      const jwtToken = window.atob(token)
      const decodedToken: { id: string } = jwt_decode(jwtToken)
      setUserId(decodedToken?.id)
      setIsLoading(false);
    } catch (error) {
      console.log('Error decoding JWT token:', error.message)
      toast.error('Token is invalid!');
      props.navigate(URLS.LOGIN);
      setIsLoading(false);
    }
  }, [])

  const handlePasswordSubmit = (data) => {
    if (data.newPassword === data.confirmPassword) {
      dispatch(
        resetPassword({
          body: {
            user_id: userId,
            password: data.newPassword,
          },
          navigation: props.navigate
        })
      )
      props.navigate(URLS.LOGIN)
    } else {
      toast.error('New password and Confirm password is not matching');
    }
  }

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      handlePasswordSubmit(values)
    },
  })

  return (
    <div className="bg-forgot-password vh-100">
      <section className="d-flex w-100 align-items-center justify-content-center h-100">

        {loading ? (
          <div className="card rounded p-4 mt-0 card-width">
            Please wait, While we validate your token...
          </div>
        ) : (<div className="card rounded p-4 mt-0 card-width">
          <div className="card-header px-2 pt-4 pb-5 bg-transparent border-0">
            <img src={EnvLogo} alt="envision logo" className='app-logo' />
          </div>

          <p className="recoveryText fs-12 pt-1 mt-2 mb-1 text-center">
            Please Enter the New password.Try to Login again with new password.
          </p>
          <div className="card-body card-content px-5 py-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextBox
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={values.newPassword}
                labelname="New Password"
                placeholder="Please enter the New Password"
                handleChange={handleChange}
                icon={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}
                handleIconClick={() => setShowPassword(!showPassword)}
                errorMessageComponent={(touched.newPassword && errors.newPassword ? (
                  <p className="form-error">
                    <i className="fa fa-info-circle"></i>
                    <span className="error-msg-txt">{errors.newPassword}</span>
                  </p>
                ) : null)}
              />

              <TextBox
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={values.confirmPassword}
                labelname="Confirm Password"
                placeholder="Please enter the confirm password"
                handleChange={handleChange}
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
                <button className="btn btn-primary login-btn upper-case">
                  Reset Password
                </button>
              </div>

              <div className="pb-3 pt-4 text-center">
                <a className="px-1 mt-1" onClick={() => props.navigate(URLS.LOGIN)}>
                  Click Here?
                </a>
                to go Login.
              </div>

            </form>
          </div>
        </div>)}

      </section>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default ResetPasswordComponent
