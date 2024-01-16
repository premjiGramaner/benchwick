import toast from 'react-hot-toast'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IImageVariationReducerState, IDispatchState } from '@Interface/index'
import api from '@API/index'

export const imageVariation: any = createAsyncThunk(
  'imageVariationReducer/imageVariation',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.imageEnvision
        .post(payload.body)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            toast.success('​Variations generated successfully!')
            resolve({ data: data || null })
          } else {
            toast.error('Facing issue while uploading')
          }
          if (payload.setFetching) payload.setFetching(false);
        })
        .catch(({ response }) => {
          if (payload.setFetching) payload.setFetching(false);
          if (response.status === 501 && response.data) {
            const { data: { error: { message } } } = response.data || { data: { data: { error: { message: 'Please try again with different format.' } } } };
            toast.error(typeof message === 'string' ? message : "Service is busy right now, Plese try again after sometimes.");
            resolve({ data: null })
          } else {
            resolve({ data: null })
          }
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
