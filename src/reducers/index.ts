import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */

import loginReducer from './loginReducer'
import forgotPasswordReducer from './forgotPasswordReducer'
import resetPasswordReducer from './resetPasswordReducer'
import signUpReducer from './signUpReducer'

/* Actions */
export * from './loginReducer'

const allReducers = combineReducers({
  loginReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  signUpReducer,
})

const rootReducer = (state: any, action: any) => {
  //   if (action.type === URLS.LOGOUT) {
  //     state = undefined
  //   }

  return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
