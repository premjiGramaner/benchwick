import * as yup from 'yup'

export default () =>
  yup.object().shape({
    user: yup
      .string()
      .required(' Username is required'),
    password: yup
      .string()
      .required(' Password is required '),
  })
