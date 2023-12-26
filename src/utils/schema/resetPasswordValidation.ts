import * as yup from 'yup'

export default () =>
  yup.object().shape({
    newPassword: yup
      .string()
      .min(5)
      .required(' newPassword is required'),
    confirmPassword: yup
      .string()
      .min(5)
      .required(' confirmPassword is required'),
  })
