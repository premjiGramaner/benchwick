import { IUsers } from '@Interface/index';
import { action } from "typesafe-actions";
import { LoginActionTypes } from "./types";

const actions = {
  addTextRequested: () => action(LoginActionTypes.SAMPLE_ADD_TEXT_REQUESTED),
  addTextSuccess: () => action(LoginActionTypes.SAMPLE_ADD_TEXT_SUCCESS),
  fetchUserRequested: (id?: string) => action(LoginActionTypes.LOGIN_FETCH_ALL_USERS_REQUESTED, { id }),
  fetchUserSucceeded: (data: IUsers[]) => action(LoginActionTypes.LOGIN_FETCH_ALL_USERS_SUCCEEDED, data),
  fetchUserFailed: (data: string) => action(LoginActionTypes.LOGIN_FETCH_ALL_USERS_FAILED, data)
}

export default actions;