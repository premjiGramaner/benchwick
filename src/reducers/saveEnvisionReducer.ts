import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ISaveEnvisionReducerState, IDispatchState } from '@Interface/index'
export const saveEnvision: any = createAsyncThunk(
  'saveEnvisionReducer/saveEnvision',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.saveEnvision
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

export const saveEnvisionReducerInitialState: ISaveEnvisionReducerState = {
  envisionData:  [],
  isError: false,
  isLoading: false,
}

const saveEnvisionReducer = createSlice({
  name: 'saveEnvisionReducer',
  initialState: saveEnvisionReducerInitialState,
  reducers: {},
  extraReducers: {
    [saveEnvision.pending]: (state: ISaveEnvisionReducerState) => {
      state.isLoading = true
    },
    [saveEnvision.fulfilled]: (
      state: ISaveEnvisionReducerState,
      action: IDispatchState
    ) => {
      state.envisionData = action.payload || null
      state.isLoading = false
      state.isError = false
    },
    [saveEnvision.failed]: (
      state: ISaveEnvisionReducerState,
      action: IDispatchState
    ) => {
      state.envisionData = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default saveEnvisionReducer.reducer
