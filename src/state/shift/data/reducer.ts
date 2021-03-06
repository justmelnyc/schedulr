import * as M from 'moment'
const union = require('lodash.union')

import {
  Action,
  RShiftData,
} from 'src/models'
import { ShiftActions } from 'src/state/actionTypes'

import {
  generateShifts
} from 'src/testUtils'

import { deleteKeysFromObject } from 'src/utils'

export const initialState: RShiftData = {
  shifts: generateShifts(M().format()),
  addedShifts: {},
  editedShifts: {},
  deletedShifts: [],
  shiftCacheIsValid: false,
  shiftCacheTimeRange: null
}

const shiftData = (state = initialState, action: Action<RShiftData>): RShiftData => {
  switch (action.type) {

    // Add and remove added shifts
    case ShiftActions.addShifts:
      const newAddedShifts = Object.assign({}, state.addedShifts, action.payload)
      return Object.assign({}, state, { addedShifts: newAddedShifts })

    case ShiftActions.removeAddedShifts:
      return Object.assign({}, state, {
        addedShifts: deleteKeysFromObject(<string[]>action.payload, state.addedShifts)
      })

    // Add and remove edited shifts
    case ShiftActions.editShifts:
      const newEditedShifts = Object.assign({}, state.editedShifts, action.payload)
      return Object.assign({}, state, {
        editedShifts: newEditedShifts
      })

    case ShiftActions.removeEditedShifts:
      return Object.assign({}, state, {
        editedShifts: deleteKeysFromObject(<string[]>action.payload, state.editedShifts)
      })

    // Add and remove delete shifts
    case ShiftActions.deleteShifts:
      return Object.assign({}, state, {
        deletedShifts: union(action.payload, state.deletedShifts)
      })

    case ShiftActions.removeDeletedShifts:
      const payload: string[] = <string[]>action.payload
      const newDeletedShifts = state.deletedShifts.filter(shiftId => {
        return payload.indexOf(shiftId) < 0
      })

      return Object.assign({}, state, {
        deletedShifts: newDeletedShifts
      })

    default:
      return state
  }
}

export default shiftData
