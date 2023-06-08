import { all, fork } from 'redux-saga/effects'

import { watchLoginSaga } from '@Store/logIn/saga'


/* When Implementing an new reducer add the watch function here */
export function* rootSaga() {
  yield all([
    fork(watchLoginSaga)
  ])
}
