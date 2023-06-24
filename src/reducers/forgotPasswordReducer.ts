import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IForgotPasswordReducerState, IDispatchState } from '@Interface/index'
export const forgotPassword: any = createAsyncThunk(
  'forgotPasswordReducer/forgotPassword',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.forgotPassword
        .post(payload)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
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

export const forgotPasswordReducerInitialState: IForgotPasswordReducerState = {
  token: null,
  isError: false,
  isLoading: false,
}

const forgotPasswordReducer = createSlice({
  name: 'forgotPasswordReducer',
  initialState: forgotPasswordReducerInitialState,
  reducers: {},
  extraReducers: {
    [forgotPassword.pending]: (state: IForgotPasswordReducerState) => {
      state.isLoading = true
    },
    [forgotPassword.fulfilled]: (
      state: IForgotPasswordReducerState,
      action: IDispatchState
    ) => {
      state.token = action.payload || null
      state.isLoading = false
      state.isError = false
    },
    [forgotPassword.failed]: (
      state: IForgotPasswordReducerState,
      action: IDispatchState
    ) => {
      state.token = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default forgotPasswordReducer.reducer
