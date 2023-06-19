import produce from 'immer'
import { Reducer } from 'redux'

import { IViewHistoryState } from '@Interface/index'
import { ViewHistoryActionTypes } from './types'

export const viewHistoryInitialState: IViewHistoryState = {
  data: [],
}

const viewHistoryReducer: Reducer<IViewHistoryState> = (
  state = viewHistoryInitialState,
  action
) => {
  return produce(state, (draft: { data: [] }) => {
    switch (action.type) {
      case ViewHistoryActionTypes.VIEWHISTORY_FETCH_SUCCEEDED:
        // console.log('action.payload1', action.payload)
        draft.data = action.payload
        break
      default:
    }
  })
}

export default viewHistoryReducer
