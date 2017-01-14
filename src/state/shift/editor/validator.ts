import * as M from 'moment'

import {
  validatorFactory
} from 'src/utils'

import {
  ShiftTemplate,
  Validator
} from 'src/models'

const shiftValidator: Validator<ShiftTemplate> = {
  client: {
    isValid: (val) => {
      return !!val
    },
    message: 'Client must be present'
  },
  location: {
    isValid: (val) => {
      return !!val
    },
    message: 'Location must be present'
  },
  id: {
    isValid: (val) => {
      return true
    },
    message: 'This will always pass'
  },
  duration: {
    isValid: (val) => {
      return val >= 15
    },
    message: 'It must be at least 15 minutes long'
  }
}

export const shiftEditorValidator = validatorFactory(shiftValidator)
