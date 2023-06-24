import { IResourceReducerState } from './ResourceReducerInterface'
import {
  ICoreReducerState,
  ILoginReducerState,
  IUsersReducerState,
} from './index'

export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  userReducer: IUsersReducerState
  resource: IResourceReducerState
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
