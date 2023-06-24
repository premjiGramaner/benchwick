import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginReducerState, IDispatchState } from '@Interface/index'
// import { setToken } from "@Utils/storage";

export const login: any = createAsyncThunk(
  'loginReducer/login',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.login
        .post(payload)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            // setToken(data?.jwt)
            resolve({
              data: data || null,
            })
          }
        })
        .catch((response: Error) => {
          resolve({ data: null })
        })
    })
  }
)

export const loginReducerInitialState: ILoginReducerState = {
  userInfo: null,
  isError: false,
  isLoading: false,
}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState: loginReducerInitialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state: ILoginReducerState) => {
      state.isLoading = true
    },
    [login.fulfilled]: (state: ILoginReducerState, action: IDispatchState) => {
      state.userInfo = action.payload || null
      state.isLoading = false
      state.isError = false
    },
    [login.failed]: (state: ILoginReducerState, action: IDispatchState) => {
      state.userInfo = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default loginReducer.reducer
