import api from '@API/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IImageVariationReducerState, IDispatchState } from '@Interface/index'
import toast from 'react-hot-toast'

export const imageVariation: any = createAsyncThunk(
  'imageVariationReducer/imageVariation',
  async (payload: any = {}) => {
    return new Promise((resolve: any) => {
      api.imageEnvision
        .post(payload)
        .then((response: any) => {
          console.log('*** response', response)
          const { data, error } = response
          if (!error) {
            toast.success('Image uploaded Successfully!')
            resolve({ data: data || null })
          } else {
            toast.error('Facing issue while uploading')
          }
        })
        .catch(({ response }) => {
          if (response.status === 501 && response.data) {
            const { data: { error: { message } } } = response.data || { data: { data: { error: { message: 'Please try again with different format.' } } } };
            toast.error(message);
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
