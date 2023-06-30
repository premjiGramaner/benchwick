import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { URLS } from '@Utils/constants'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import {
  IDefaultPageProps,
  IForgotPasswordProps,
  IReducerState,
} from '@Utils/interface'
import TextBox from '@Components/TextBox/TextBox'
import schema from '@Utils/schema/forgotPasswordValidation'
import { forgotPassword } from 'src/reducers/forgotPasswordReducer'
import { useSelector } from 'react-redux'
const ForgotPasswordComponent: React.FC<
  IDefaultPageProps & IForgotPasswordProps
> = props => {
  const { statusCode } = useSelector(
    (state: IReducerState) => state.forgotPasswordReducer
  )
  useEffect(() => {
    if (statusCode === 200) {
      toast.success('Link sent Successfully,Kindly log In!')
      props.navigate(URLS.LOGIN)
    } else {
      toast.error('Kindly check your recovery email')
    }
  }, [statusCode])
  const dispatch = useDispatch()
  const handleLinkSubmit = data => {
    dispatch(
      forgotPassword({
        email: data.email,
        redirect_URL: 'http://localhost:8080/resetPassword',
      })
    )
  }

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { email: '' },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      handleLinkSubmit(values)
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
            Please Enter the registered Email ID. Recovery Link will be send to
            the register Email ID
          </p>
          <div className="card-body card-content px-5 py-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextBox
                type="text"
                name="email"
                value={values.email}
                labelname="Email"
                placeholder="Please enter the registered email"
                handleChange={handleChange}
              />

              {touched.email && errors.email ? (
                <p className="form-error">
                  <i className="fa fa-info-circle"></i>
                  <span className="error-msg-txt">{errors.email}</span>
                </p>
              ) : null}

              <div className="pb-0 pt-4 bg-transparent d-flex text-center">
                <button className="btn btn-primary login-btn upper-case">
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default ForgotPasswordComponent
