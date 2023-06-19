import { IUsers } from '@Interface/index'
import { action } from 'typesafe-actions'
import { ViewHistoryActionTypes } from './types'
import { IViewHistoryState } from '@Interface/index'

const actions = {
  fetchViewhistorySucceeded: (payload: IViewHistoryState) => ({
    type: ViewHistoryActionTypes.VIEWHISTORY_FETCH_SUCCEEDED,
    payload,
  }),
  fetchViewhistoryRequested: (data: string) =>
    action(ViewHistoryActionTypes.VIEWHISTORY_FETCH_REQUESTED, data),
}

export default actions
