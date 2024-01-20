import { URLS } from '@Utils/constants';
import { combineReducers } from 'redux'

/* All Reducers */
import loginReducer from './loginReducer'
import forgotPasswordReducer from './forgotPasswordReducer'
import resetPasswordReducer from './resetPasswordReducer'
import signUpReducer from './signUpReducer'
import imageVariationReducer from './imageVariationReducer'
import saveEnvisionReducer from './saveEnvisionReducer'
import userHistoryReducer from './userHistoryReducer'
import getEnvisionVariantsReducer from './getEnvisionVariantsReducer'

/* All Actions */
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
  if (action.type === 'loginReducer/logout/fulfilled') state = undefined;
  return allReducers(state, action)
}

export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
