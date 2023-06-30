import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IImageVariationReducerState, IDispatchState } from '@Interface/index'
export const imageVariation: any = createAsyncThunk(
  'imageVariationReducer/imageVariation',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.imageEnvision
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
export const imageVariationInitialState: IImageVariationReducerState = {
  imageInfo: [],
  isError: false,
  isLoading: false,
  statusCode: null,
}

const imageVariationReducer = createSlice({
  name: 'imageVariationReducer',
  initialState: imageVariationInitialState,
  reducers: {},
  extraReducers: {
    [imageVariation.pending]: (state: IImageVariationReducerState) => {
      state.isLoading = true
    },
    [imageVariation.fulfilled]: (
      state: IImageVariationReducerState,
      action: IDispatchState
    ) => {
      state.imageInfo = action.payload || null
      state.statusCode = action?.payload?.data?.statusCode
      state.isLoading = false
      state.isError = false
    },
    [imageVariation.failed]: (
      state: IImageVariationReducerState,
      action: IDispatchState
    ) => {
      state.imageInfo = null
      state.isLoading = false
      state.isError = true
    },
  },
})

export default imageVariationReducer.reducer
