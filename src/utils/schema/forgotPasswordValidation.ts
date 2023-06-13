import * as yup from 'yup'

export default () =>
  yup.object().shape({
    email: yup
      .string()
      .email(' Please enter valid email address ')
      .required(' Email is required '),
  })
