import * as yup from 'yup'
export default () =>
  yup.object().shape({
    user: yup.string().required(' Name is required '),
    email: yup
      .string()
      .email(' Please enter valid email address ')
      .required(' Email is required '),
    password: yup.string().required(' Password is required '),
    confirmPassword: yup.string().required(' Confirm Password is required '),
  })
