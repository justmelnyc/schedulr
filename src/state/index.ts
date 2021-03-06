import { combineReducers } from 'redux'

import {
  routerReducer,
} from 'react-router-redux'

import calendar from './calendar/reducer'
import entities from './entities/reducer'
import shift from './shift'
import ui from './ui'


const rootReducer = combineReducers({
  calendar,
  shift,
  ui,
  entities,
  routing: routerReducer
})

export default rootReducer
