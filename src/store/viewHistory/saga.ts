import { all, call, put, takeLatest } from 'redux-saga/effects'
import API from "@API/index";
import { ViewHistoryActionTypes } from './types'
import actions from './actions'

function* fetchViewhistorySucceeded(action: any) {
  try {
    const searchTableResponse = yield call(API.viewTable.get, 
      action.payload
    )
    yield put(actions.fetchViewhistorySucceeded(searchTableResponse.data))
  } catch (error) {
   
  }
}

export function* watchViewhistorySaga() {
  yield all([
    takeLatest(
      ViewHistoryActionTypes.VIEWHISTORY_FETCH_REQUESTED,
      fetchViewhistorySucceeded
    ),
  ])
}
