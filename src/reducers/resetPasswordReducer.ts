import { URLS } from '@Utils/constants';
import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IResetPasswordReducerState, IDispatchState } from '@Interface/index'
import toast from 'react-hot-toast'

export const resetPassword: any = createAsyncThunk(
  'resetPasswordReducer/resetPassword',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.resetPassword
        .post(payload.body)
        .then((response: any) => {
          const { data, error } = response
          const navigate = payload.navigation;
          if (!error) {
            resolve({
              data: data || null,
            });

            toast.success('Password updated, Please try login with your new password!');
            setTimeout(() => navigate(URLS.LOGIN), 200);
          } else {
            toast.error('Failed to update password, Please contact administrator');
          }
        })
        .catch(() => {
          toast.error('Failed to update password, Please contact administrator');
          resolve({ data: null })
        })
    })
  }
)

export const resetPasswordReducerInitialState: IResetPasswordReducerState = {
  status: [],
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
