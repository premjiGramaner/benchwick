import { combineReducers } from 'redux'

import loginReducer from '@Store/logIn/reducers'
import viewHistoryReducer from '@Store/viewHistory/reducers'

export default combineReducers({
  loginReducer: loginReducer,
  viewHistoryReducer: viewHistoryReducer
})
