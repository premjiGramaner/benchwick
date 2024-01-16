import toast from 'react-hot-toast'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginReducerState, IDispatchState } from '@Interface/index'
import { updateStorages } from '@Utils/storage'
import { URLS } from '@Utils/constants'
import api from '@API/index'
import { Cookies } from 'react-cookie'

const cookie = new Cookies();
export const login: any = createAsyncThunk(
  'loginReducer/login',
  async (payload: any = {}, { rejectWithValue }) => {
    try {
      const response: any = await api.login.post(payload)
      const { data, error } = response
      if (!error) {
        toast.success('Successfully logged In!')
        updateStorages({ user_token: data?.data?.user_token, name: data?.data?.name, auth: true, isCookie: cookie.get('isRemember') });
        return { data }
      } else {
        toast.error('Please check your credentials')
        return rejectWithValue(data)
      }
    } catch (error) {
      toast.error('Please check your credentials')
      return rejectWithValue(error)
    }
  }
)

export const login_with_google: any = createAsyncThunk(
  'loginReducer/login',
  async (payload: any = {}, { rejectWithValue }) => {
    try {
      const response: any = await api.login.google_sign_in(payload)
      const { data, error } = response
      if (!error) {
        toast.success('Successfully logged In!')
        updateStorages({ user_token: data?.data?.user_token, name: data?.data?.name, auth: true, isCookie: false });
        return { data }
      } else {
        toast.error('Failed to authorize your request, Plese try after sometimes.')
        return rejectWithValue(data)
      }
    } catch (error) {
      toast.error('Failed to authorize your request, Plese try after sometimes.')
      return rejectWithValue(error)
    }
  }
)

export const logout: any = createAsyncThunk('loginReducer/logout', async () => {
  return new Promise((resolve: any) => {
    resolve({})
  })
})

export const loginReducerInitialState: ILoginReducerState = {
  userInfo: null,
  isError: false,
  isLoading: false,
  statusCode: null,
}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState: loginReducerInitialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state: ILoginReducerState) => {
      state.isLoading = true
    },
    [login.fulfilled]: (state: ILoginReducerState, { payload }: IDispatchState) => {
      state.userInfo = payload?.data?.data || null
      state.statusCode = payload?.data?.statusCode
      state.isLoading = false
      state.isError = false

      if (payload?.data?.statusCode === 200) {
        setTimeout(() => {
          window.location.href = URLS.DASHBOARD
        }, 500)
      }
    },
    [login.rejected]: (state: ILoginReducerState, action: IDispatchState) => {
      state.userInfo = null
      state.isLoading = false
      state.isError = true
      state.statusCode = action?.payload?.response?.status
    },
    [logout.fulfilled]: (state: ILoginReducerState) => {
      state.userInfo = null
      state.statusCode = null
    },
  },
})

export default loginReducer.reducer
