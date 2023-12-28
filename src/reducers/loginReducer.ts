import toast from 'react-hot-toast'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginReducerState, IDispatchState } from '@Interface/index'
import { IS_USER_AUTHENTICATED, getAuthToken ,getLoggedUserName} from '@Utils/storage'
import { URLS } from '@Utils/constants'
import api from '@API/index'

export const login: any = createAsyncThunk(
  'loginReducer/login',
  async (payload: any = {}, { rejectWithValue }) => {
    try {
      const response: any = await api.login.post(payload)
      const { data, error } = response
      if (!error) {
        getAuthToken(data?.data?.user_token);
        getLoggedUserName(data);        
        return { data }
      } else {
        return rejectWithValue(data)
      }
    } catch (error) {
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
  userInfo: [],
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
    [login.fulfilled]: (state: ILoginReducerState, action: IDispatchState) => {
      state.userInfo = action.payload || null
      state.statusCode = action?.payload?.data?.statusCode
      state.isLoading = false
      state.isError = false
      if (action?.payload?.data?.statusCode === 200) {
        setTimeout(() => {
          window.location.href = URLS.DASHBOARD
          IS_USER_AUTHENTICATED(true)
        }, 1000)
      }
    },
    [login.rejected]: (state: ILoginReducerState, action: IDispatchState) => {
      state.userInfo = null
      state.isLoading = false
      state.isError = true
      state.statusCode = action?.payload?.response?.status
      toast.error('Please check your credentials')
    },
    [logout.fulfilled]: (state: ILoginReducerState) => {
      state.userInfo = null
      state.statusCode = null
    },
  },
})

export default loginReducer.reducer
