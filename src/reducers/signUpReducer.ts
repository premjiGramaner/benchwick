import toast from 'react-hot-toast'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ISignUpReducerState, IDispatchState } from '@Interface/index'
import api from '@API/index'
import { URLS } from '@Utils/constants';
import axios from 'axios';

export const signUp: any = createAsyncThunk(
  'signUpReducer/signUpPassword',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      const navigate = payload.navigation;
      api.signUp
        .post(payload.body)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            toast.success('Signed up Successfully!');
            resolve({
              data: data || null,
            })
            navigate(URLS.LOGIN)
          } else {
            toast.error('Please check your credentials')
          }
        })
        .catch(() => {
          toast.error('Facing issue while saving')
          resolve({ data: null })
        })
    })
  }
)

export const getUserInfoFromGoogle = async (access_token: string) => {
  return axios
    .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json'
      },
    })
    .then(res => res.data);
}

export const signUpReducerInitialState: ISignUpReducerState = {
  statusCode: null,
  signupDetails: [],
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
      state.statusCode = action?.payload?.data?.statusCode
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
