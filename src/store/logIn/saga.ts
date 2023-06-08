import { all, call, put, takeLatest } from 'redux-saga/effects'
import API from "@API/index";
import { LoginActionTypes } from './types'
import actions from './actions'

export function* addTextRequested(action: ReturnType<typeof actions.addTextRequested>) {
  yield put(actions.addTextSuccess())
}

function* fetchUserRequested(action: ReturnType<typeof actions.fetchUserRequested>) {
  try {
    // If you want to get any payload you can use like this
    const { id } = action.payload;
    console.log('sample prop for demo', id);

    let users = yield call(API.login.get)
    yield put(actions.fetchUserSucceeded(users.data))
  } catch (error) {
    yield put(actions.fetchUserFailed(error.message))
  }
}

export function* watchLoginSaga() {
  yield all([
    takeLatest(LoginActionTypes.SAMPLE_ADD_TEXT_REQUESTED, addTextRequested),
    takeLatest(LoginActionTypes.LOGIN_FETCH_ALL_USERS_REQUESTED, fetchUserRequested),
  ])
}
