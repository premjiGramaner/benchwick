import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@API/index'
import {
  IGetEnvisionVariantsReducerState,
  IDispatchState,
} from '@Interface/index'

export const getEnvisionVariants: any = createAsyncThunk(
  'getEnvisionVariantsReducer/getEnvisionVariants',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.getEnvisionVariations
        .get(payload)
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

export const getEnvisionVariantsReducerInitialState: IGetEnvisionVariantsReducerState =
  {
    variantData: [],
    isError: false,
    isLoading: false,
    statusCode: null,
  }

const getEnvisionVariantsReducer = createSlice({
  name: 'getEnvisionVariantsReducer',
  initialState: getEnvisionVariantsReducerInitialState,
  reducers: {},
  extraReducers: {
    [getEnvisionVariants.pending]: (
      state: IGetEnvisionVariantsReducerState
    ) => {
      state.isLoading = true
    },
    [getEnvisionVariants.fulfilled]: (
      state: IGetEnvisionVariantsReducerState,
      action: IDispatchState
    ) => {
      state.variantData = action?.payload?.data?.data?.imageVariant || null
      state.statusCode = action?.payload?.data?.statusCode
      state.isLoading = false
      state.isError = false
    },
    [getEnvisionVariants.failed]: (
      state: IGetEnvisionVariantsReducerState,
      action: IDispatchState
    ) => {
      state.variantData = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default getEnvisionVariantsReducer.reducer
