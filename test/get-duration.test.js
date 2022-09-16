const getDuration = require('../src/helper/get-duration')

describe('getDuration function', () => {
  test('gets time as a day between given two date objects', () => {
    const startDate = new Date('09/13/2022')
    const endDate = new Date('09/15/2022')

    const result = getDuration(startDate, endDate)

    expect(result).toBe(2)
  })

  test('gets time as a day between given two strings should throw error', () => {
    const startDate = '09/13/2022'
    const endDate = '09/15/2022'

    expect(() => getDuration(startDate, endDate)).toThrow(TypeError)
  })

  test('if startDate > endDate it should throw error', () => {
    const startDate = new Date('09/15/2022')
    const endDate = new Date('09/13/2022')

    expect(() => getDuration(startDate, endDate)).toThrow('Dates are invalid.')
  })

  test('if startDate is invalid date should throw error', () => {
    const startDate = '09/54/2022'
    const endDate = new Date('09/15/2022')

    expect(() => getDuration(startDate, endDate)).toThrow(TypeError)
  })

  test('if endDate is invalid date should throw error', () => {
    const startDate = new Date('09/15/2022')
    const endDate = '09/54/2022'

    expect(() => getDuration(startDate, endDate)).toThrow(Error)
  })
})
