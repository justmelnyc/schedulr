import * as M from 'moment'

import { Shifts } from './../../models'

export function generateShifts(startTime: string): Shifts {
  const shifts: Shifts = {}

  const startDate = M(startTime).subtract(2, 'month')
  const endDate = M(startTime).add(2, 'month')
  let currDate = startDate.clone()

  while (currDate < endDate) {

    if (currDate.day() % 2 === 0) {
      shifts[`${currDate.format()}`]
      addShifts(shifts, currDate.format(), 5)
    } else {
      addShifts(shifts, currDate.format(), 3)
    }

    currDate.add(1, 'day')
  }

  return shifts
}


function addShifts(shifts: Shifts, date: string, times: number): void {
  for (let i = 0; i < times; i++) {
    shifts[`${date}__${i}`] = {
      startTime: date,
      duration: 60 * 8
    }
  }
}
