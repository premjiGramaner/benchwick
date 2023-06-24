import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ISignUpReducerState, IDispatchState } from '@Interface/index'
export const signUp: any = createAsyncThunk(
  'signUpReducer/signUpPassword',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.signUp
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

export const signUpReducerInitialState: ISignUpReducerState = {
  signupDetails: null,
  isError: false,
  isLoading: false,
}

const signUpReducer = createSlice({
  name: 'signUpReducer',
  initialState: signUpReducerInitialState,
  reducers: {},
  extraReducers: {
    [signUp.pending]: (state: ISignUpReducerState) => {
      state.isLoading = true
    },
    [signUp.fulfilled]: (
      state: ISignUpReducerState,
      action: IDispatchState
    ) => {
      state.signupDetails = action.payload || null
      state.isLoading = false
      state.isError = false
    },
    [signUp.failed]: (state: ISignUpReducerState, action: IDispatchState) => {
      state.signupDetails = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default signUpReducer.reducer
