export interface ILoginReducerState {
  userInfo: IUserInfo
  statusCode: null
  isLoading: boolean
  isError: boolean
}

export interface IUserInfo {
  id: number
  uuid: string
  name: string
  email: string
  role: string
  user_token: string
}