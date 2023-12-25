import * as yup from 'yup'
export default () =>
  yup.object().shape({
    user: yup.string().required(' Name is required '),
    email: yup
      .string()
      .email(' Please enter valid email address ')
      .required(' Email is required '),
    password: yup.string().min(5).required(' Password is required '),
    confirmPassword: yup.string().min(5).required(' Confirm Password is required '),
  })
