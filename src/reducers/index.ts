import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */

import loginReducer from './loginReducer'
import forgotPasswordReducer from './forgotPasswordReducer'
import resetPasswordReducer from './resetPasswordReducer'
import signUpReducer from './signUpReducer'
import imageVariationReducer from './imageVariationReducer'
import saveEnvisionReducer from './saveEnvisionReducer'
import userHistoryReducer from './userHistoryReducer'
import getEnvisionVariantsReducer from './getEnvisionVariantsReducer'

/* Actions */
export * from './loginReducer'

const allReducers = combineReducers({
  loginReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  signUpReducer,
  imageVariationReducer,
  saveEnvisionReducer,
  userHistoryReducer,
  getEnvisionVariantsReducer,
})

const rootReducer = (state: any, action: any) => {
  //   if (action.type === URLS.LOGOUT) {
  //     state = undefined
  //   }

  return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
