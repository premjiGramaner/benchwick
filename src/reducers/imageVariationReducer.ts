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
            if (data?.data?.data?.info.length == payload.range) {
              toast.success('​Variations generated successfully')
            } else {
              toast('Some of the generate images are Invalid and skipped!')
            }
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
  imageInfo: null,
  socketData: null,
  isError: false,
  isLoading: false,
  statusCode: null,
}

const imageVariationReducer = createSlice({
  name: 'imageVariationReducer',
  initialState: imageVariationInitialState,
  reducers: {
    resetImages(state) {
      state.imageInfo = null;
      state.statusCode = 200;
      state.isLoading = false;
      state.isError = false;
    },
    updateImages(state, action) {
      state.imageInfo = action.payload?.data?.data || null;
      state.statusCode = null;
      state.isError = false;
    },
    updateSocketInfo(state, action) {
      if (action.payload.type === null) {
        state.socketData = null;
      } else {
        state.isLoading = true;
        if (state.socketData) {
          state.socketData[action.payload.type] = action.payload.data;
        } else {
          state.socketData = {
            [action.payload.type]: action.payload.data
          } as any;
        }
      }
    },
  },
  extraReducers: {
    [imageVariation.pending]: (state: IImageVariationReducerState) => {
      state.isLoading = true;
    },
    [imageVariation.fulfilled]: (
      state: IImageVariationReducerState,
      action: IDispatchState
    ) => {
      state.imageInfo = action.payload?.data?.data || null
      state.statusCode = action?.payload?.data?.statusCode;
      state.isLoading = false;
      state.isError = false;
    },
    [imageVariation.failed]: (
      state: IImageVariationReducerState,
      action: IDispatchState
    ) => {
      state.imageInfo = null;
      state.isLoading = false;
      state.isError = true;
    },
  },
})

export const { resetImages, updateSocketInfo, updateImages } = imageVariationReducer.actions;
export default imageVariationReducer.reducer
