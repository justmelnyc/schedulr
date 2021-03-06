import { combineReducers } from 'redux'

import shiftData from './data/reducer'
import shiftEditor from './editor/reducer'

const shift = combineReducers({
  data: shiftData,
  editor: shiftEditor
})

export default shift

export * from './data/selector'
export * from './data/action'
export * from './editor/selector'
export * from './editor/action'
export * from './editor/validator'
