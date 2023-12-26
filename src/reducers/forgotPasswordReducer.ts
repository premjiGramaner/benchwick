import { URLS } from '@Utils/constants';
import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IForgotPasswordReducerState, IDispatchState } from '@Interface/index'
import toast from 'react-hot-toast'

export const forgotPassword: any = createAsyncThunk(
  'forgotPasswordReducer/forgotPassword',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.forgotPassword
        .post(payload.body)
        .then((response: any) => {
          const navigate = payload.navigation;
          const { data, error } = response;
          if (!error) {
            resolve({
              data: data || null,
            })

            toast.success('Link sent Successfully, Please try login with your credentials!');
            setTimeout(() => navigate(URLS.LOGIN), 200);
          } else {
            toast.error('Kindly check your recovery email');
          }
        })
        .catch(() => {
          toast.error('Kindly check your recovery email');
          resolve({ data: null })
        })
    })
  }
)

export const forgotPasswordReducerInitialState: IForgotPasswordReducerState = {
  token: [],
  isError: false,
  isLoading: false,
  statusCode: null,
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
      state.statusCode = action?.payload?.data?.statusCode
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
