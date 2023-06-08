import { combineReducers } from 'redux'

import loginReducer from '@Store/logIn/reducers'

export default combineReducers({
  loginReducer: loginReducer,
})
