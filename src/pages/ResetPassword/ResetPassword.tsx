import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { URLS } from '@Utils/constants'
import { useDispatch } from 'react-redux'
import {
  IDefaultPageProps,
  ILoginPageProps,
  IReducerState,
} from '@Utils/interface'
import TextBox from '@Components/TextBox/TextBox'
import schema from '@Utils/schema/resetPasswordValidation'
import { resetPassword } from 'src/reducers/resetPasswordReducer'
import jwt_decode from 'jwt-decode'
const ResetPasswordComponent: React.FC<any> = props => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState<string>()

  useEffect(() => {
    try {
      const urlData = window.location.href
      const urlFormID = urlData.split('resetPassword?token=')
      const token = urlFormID[1]
      const jwtToken = window.atob(token)
      const decodedToken = jwt_decode(jwtToken)
      setUserId(decodedToken.id)
    } catch (error) {
      console.log('Error decoding JWT token:', error.message)
    }
  }, [])
  console.log('userId', userId)
  const handlePasswordSubmit = data => {
    dispatch(
      resetPassword({
        user_id: userId,
        password: data.newPassword,
      })
    )
    props.navigate(URLS.LOGIN)
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
        <div className="card rounded p-4 mt-0 card-width">
          <div className="card-header px-2 pt-4 pb-5 bg-transparent border-0">
            <figure className="mb-0 pb-3">{/* <img src={logo} /> */}</figure>
            <h1 className="px-5 py-0 fw-bold mb-0">Logo envision</h1>
          </div>

          <p className="recoveryText fs-12 pt-1 mt-2 mb-1 text-center">
            Please Enter the New password.Try to Login again with new password.
          </p>
          <div className="card-body card-content px-5 py-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextBox
                type="text"
                name="newPassword"
                value={values.newPassword}
                labelname="New Password"
                placeholder="Please enter the New Password"
                handleChange={handleChange}
              />

              {touched.newPassword && errors.newPassword ? (
                <p className="form-error">
                  <i className="fa fa-info-circle"></i>
                  <span className="error-msg-txt">{errors.newPassword}</span>
                </p>
              ) : null}
              <TextBox
                type="text"
                name="confirmPassword"
                value={values.confirmPassword}
                labelname="Confirm Password"
                placeholder="Please enter the new Password again"
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
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ResetPasswordComponent
