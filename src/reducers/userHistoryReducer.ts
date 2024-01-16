import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IUserHistoryReducerState, IDispatchState } from '@Interface/index'
import toast from 'react-hot-toast'
import api from '@API/index'

export const userHistory: any = createAsyncThunk(
  'userHistoryReducer/userHistory',
  async () => {
    return new Promise((resolve: any) => {
      api.userHistory
        .get()
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            resolve({
              data: data || null,
            })
          }
        })
        .catch(() => {
          toast.success('Failed to get user history!');
          resolve({ data: null })
        })
    })
  }
)

export const deleteHistory: any = createAsyncThunk(
  'userHistoryReducer/deleteHistory',
  async (payload: number, thunkAPI) => {
    return new Promise((resolve: any) => {
      api.deleteHistory
        .delete(payload)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            toast.success('History deleted successfully!');
            thunkAPI.dispatch(userHistory());
            resolve({
              data: data || null,
            })
          }
        })
        .catch(() => {
          toast.success('Failed to delete history!');
          resolve(null)
        })
    })
  }
)

export const userHistoryReducerInitialState: IUserHistoryReducerState = {
  data: [],
  isError: false,
  isLoading: false,
  statusCode: null,
}

const userHistoryReducer = createSlice({
  name: 'userHistoryReducer',
  initialState: userHistoryReducerInitialState,
  reducers: {},
  extraReducers: {
    [userHistory.pending]: (state: IUserHistoryReducerState) => {
      state.isLoading = true
    },
    [userHistory.fulfilled]: (
      state: IUserHistoryReducerState,
      action: IDispatchState
    ) => {
      state.data = action.payload?.data?.data.imageList || null
      state.statusCode = action?.payload?.data?.statusCode
      state.isLoading = false
      state.isError = false
    },
    [userHistory.failed]: (
      state: IUserHistoryReducerState,
      action: IDispatchState
    ) => {
      state.data = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default userHistoryReducer.reducer
