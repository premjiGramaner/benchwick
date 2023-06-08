import produce from "immer";
import { Reducer } from "redux";

import { IUsers, ILoginState } from '@Interface/index';
import { LoginActionTypes } from "./types";


export const loginInitialState: ILoginState = {
  textCount: 10,
  fetchUserLoading: false,
  users: [],
  fetchUserFailed: ""
}

const loginReducer: Reducer<ILoginState> = (state = loginInitialState, action) => {
  return produce(state, (draft: { textCount: number, users: IUsers[], fetchUserLoading: boolean, fetchUserFailed: string }) => {
    switch (action.type) {
      case LoginActionTypes.SAMPLE_ADD_TEXT_SUCCESS:
        draft.textCount = state.textCount + 2;
        break;

      case LoginActionTypes.LOGIN_FETCH_ALL_USERS_REQUESTED:
        draft.fetchUserFailed = "";
        draft.fetchUserLoading = true;
        break;
      case LoginActionTypes.LOGIN_FETCH_ALL_USERS_SUCCEEDED:
        draft.fetchUserLoading = false;
        draft.users = action.payload;
        break;

      case LoginActionTypes.LOGIN_FETCH_ALL_USERS_FAILED:
        draft.fetchUserLoading = false;
        draft.users = [];
        draft.fetchUserFailed = action.payload;
        break;
      default:
    }
  });
}

export default loginReducer;
