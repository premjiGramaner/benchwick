import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IResetPasswordReducerState, IDispatchState } from '@Interface/index'
export const resetPassword: any = createAsyncThunk(
  'resetPasswordReducer/resetPassword',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.resetPassword
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

export const resetPasswordReducerInitialState: IResetPasswordReducerState = {
  status:  [],
  isError: false,
  isLoading: false,
}

const resetPasswordReducer = createSlice({
  name: 'resetPasswordReducer',
  initialState: resetPasswordReducerInitialState,
  reducers: {},
  extraReducers: {
    [resetPassword.pending]: (state: IResetPasswordReducerState) => {
      state.isLoading = true
    },
    [resetPassword.fulfilled]: (
      state: IResetPasswordReducerState,
      action: IDispatchState
    ) => {
      state.status = action.payload || null
      state.isLoading = false
      state.isError = false
    },
    [resetPassword.failed]: (
      state: IResetPasswordReducerState,
      action: IDispatchState
    ) => {
      state.status = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default resetPasswordReducer.reducer
