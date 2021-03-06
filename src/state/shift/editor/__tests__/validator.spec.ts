import * as M from 'moment'

import {
  RState,
  Shift,
  ShiftTemplate,
  Shifts,
  Employee,
  ValidatorResponseObject
} from 'src/models'

import {
  validateNewShifts
} from './../validator'

import {
  getEmployeeById
} from 'src/state/entities'

const expectedMessages = {
  duration: {
    duration: ['It must be at least 15 minutes long']
  },
  client: {
    client: ['Client must be present']
  },
  location: {
    location: ['Location must be present']
  },
  startTime: (employees: Employee[]) => ({
    startTime: employees.map(employee => `${employee.alias} is already scheduled at this time`)
  })
}

// shift two is the same employee but 30 mins after 
const employeeOneStart = M().hour(12).minute(0).second(0)
const employeeOneDuration = 120
const employeeTwoStart = employeeOneStart.clone().add(employeeOneDuration + 30).format()
const employeeTwoDuration = 120
const employees = ['employeeOne', 'employeeTwo']

describe('#shiftEditorValidator', () => {

  it('if all shifts are valid it should return an empty object', () => {
    const res = validateNewShifts(getState(['remployee', 'remployee1'], {
      client: 'qwasv',
      duration: 15,
      location: '3qweafsdz',
      startTime: M().format()
    }))

    expect(res).toEqual({})
  })

  it('if there is no client', () => {
    testNoOneAndMultipleEmployees(
      {
        client: null,
        duration: 15,
        location: '3qweafsdz',
        startTime: M().format()
      },
      expectedMessages.client
    )
  })

  it('if there is no location', () => {
    testNoOneAndMultipleEmployees(
      {
        client: 'null3qewaf',
        duration: 15,
        location: null,
        startTime: M().format()
      },
      expectedMessages.location
    )
  })

  it('if duration is less than 15', () => {
    testNoOneAndMultipleEmployees(
      {
        client: 'null3qewaf',
        duration: 5,
        location: 'null12qewfda',
        startTime: M().format()
      },
      expectedMessages.duration
    )
  })

  it('if all client, location and duration are missing', () => {
    testNoOneAndMultipleEmployees(
      {
        client: null,
        duration: 5,
        location: null,
        startTime: M().format()
      },
      Object.assign({}, expectedMessages.client, expectedMessages.duration, expectedMessages.location)
    )
  })

  it('if an employees startTime overlaps it should be returned in an array', () => {
    const employee = getEmployeeById(getState(), employees[0])

    testNoOneAndMultipleEmployees(
      {
        client: '13qeasdf',
        location: 'null3qewfasdfd',
        startTime: employeeOneStart.format(),
        duration: employeeOneDuration,
      },
      expectedMessages.startTime([employee]),
      [employees[0]]
    )
  })

  it('if an multiple employees startTime overlaps it should be returned in an array', () => {
    testNoOneAndMultipleEmployees(
      {
        client: '13qeasdf',
        location: 'null3qewfasdfd',
        startTime: employeeOneStart.format(),
        duration: employeeOneDuration,
      },
      expectedMessages.startTime(employees.map(employee => getEmployeeById(getState(employees), employee))),
      employees
    )
  })

})

function testNoOneAndMultipleEmployees(
  newShift: ShiftTemplate,
  expectedResponse: ValidatorResponseObject<Shift>,
  employeesInShift: string[] = []
) {
  [[], [employees[0]], [employees[1]], employees].forEach(employeeArray => {
    const res = validateNewShifts(getState(employeesInShift, newShift))
    expect(res).toEqual(expectedResponse)
  })
}

function getState(employeesInShift: string[] = [], newShift: ShiftTemplate = {}): RState {
  return {
    entities: {
      employees: {
        [employees[0]]: {
          firstName: 'Joey',
          lastName: 'Farina',
          alias: 'J Farina'
        },
        [employees[1]]: {
          firstName: 'Shaya',
          lastName: 'AlArfaj',
          alias: 'S AlArfaj'
        }
      }
    },
    shift: {
      data: {
        addedShifts: {},
        deletedShifts: [],
        editedShifts: {},
        shifts: {
          'qadfgt1tqrge': {
            employee: employees[0],
            startTime: employeeOneStart.format(),
            duration: employeeOneDuration
          },
          '13qewgwaeafda': {
            employee: employees[1],
            startTime: employeeTwoStart,
            duration: employeeTwoDuration
          }
        }
      },
      editor: {
        employeesInShift,
        newShift
      }
    }
  }
}
