import * as yup from 'yup'

export default () =>
  yup.object().shape({
    newPassword: yup
      .string()
      .required(' newPassword is required'),
      confirmPassword: yup
      .string()
      .required(' confirmPassword is required'),
  })
