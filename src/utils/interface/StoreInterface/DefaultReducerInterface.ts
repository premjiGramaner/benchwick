import { IResourceReducerState } from './ResourceReducerInterface'
import {
  ICoreReducerState,
  ILoginReducerState,
  IUserHistoryReducerState,
  IGetEnvisionVariantsReducerState,
  IImageVariationReducerState,
  IForgotPasswordReducerState,
  ISignUpReducerState,
  ISaveEnvisionReducerState,
} from './index'

export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  userHistoryReducer: IUserHistoryReducerState
  getEnvisionVariantsReducer: IGetEnvisionVariantsReducerState
  imageVariationReducer: IImageVariationReducerState
  forgotPasswordReducer: IForgotPasswordReducerState
  signUpReducer: ISignUpReducerState
  saveEnvisionReducer: ISaveEnvisionReducerState
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
