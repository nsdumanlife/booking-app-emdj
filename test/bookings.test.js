const request = require('supertest')
const app = require('../src/app')

describe('bookings endpoint', () => {
  it('get bookings list', async () => {
    const bookingsResponse = await request(app).get('/bookings').expect(200)
    const bookings = bookingsResponse.body

    const bookingsExist = bookings.length > 0

    expect(bookingsExist).toBe(true)
  })

  it('create a new booking', async () => {
    const bungalowToCreate = {
      name: 'somebungalowbooking',
      location: 'somewherebooking',
      capacity: 4,
      price: 1250,
    }

    const checkInDate = new Date('10/01/2022')
    const checkOutDate = new Date('10/03/2022')

    const userToCreate = {
      firstName: 'ege',
      lastName: 'duman',
      email: 'ege@duman.com',
      age: 1,
    }

    const userResponse = await request(app).post('/users').send(userToCreate).expect(200)
    const createdUser = userResponse.body

    const bungalowResponse = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowResponse.body

    const bookingResponse = await request(app)
      .post(`/bookings`)
      .send({ guest: createdUser, bungalow: createdBungalow, checkInDate, checkOutDate })
    const createdBooking = bookingResponse.body
    console.log('====booking===', createdBooking)

    expect(createdBooking.totalPrice).toBe(2500)
    expect(createdBooking.status).toBe('Upcoming')
    expect(createdBooking).toMatchObject({ bungalow: createdBungalow, checkInDate, checkOutDate, guest: createdUser })
  })
})
