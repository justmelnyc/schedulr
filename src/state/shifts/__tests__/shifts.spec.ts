import * as Models from './../../../models'
import { ActionTypes } from './../../actionTypes'
import * as Actions from './../action'
import shift from './../reducer'

const shifts: Models.Shifts = {
  one: {
    startTime: 'asf',
    duration: 500
  },
  two: {
    startTime: 'asf',
    duration: 500
  },
  three: {
    startTime: 'hello',
    duration: 139
  }
}

describe('Shift State', () => {

  it('reducer should output the correct state', () => {
    const state = shift(undefined, Actions.addShifts(shifts))
    expect(state).toEqual({
      ids: Object.keys(shifts),
      shifts
    })
  })

})