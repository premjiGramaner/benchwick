import { IResourceReducerState } from './ResourceReducerInterface'
import {
  ICoreReducerState,
  ILoginReducerState,
  IUserHistoryReducerState,
  IGetEnvisionVariantsReducerState,
  IImageVariationReducerState,

} from './index'

export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  userHistoryReducer:IUserHistoryReducerState
  getEnvisionVariantsReducer:IGetEnvisionVariantsReducerState
  imageVariationReducer:IImageVariationReducerState
  
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
