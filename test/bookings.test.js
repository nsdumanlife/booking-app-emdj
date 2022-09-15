/* eslint-disable no-underscore-dangle */
const request = require('supertest')
const app = require('../src/app')

describe('bookings endpoint', () => {
  it('get bookings list', async () => {
    const bookingsRequest = await request(app).get('/bookings').expect(200)
    const bookings = bookingsRequest.body

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

    const userRequest = await request(app).post('/users').send(userToCreate).expect(200)
    const createdUser = userRequest.body

    const bungalowRequest = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const bookingRequest = await request(app)
      .post(`/bookings`)
      .send({ guest: createdUser, bungalowId: createdBungalow._id, checkInDate, checkOutDate })
    // booking does not include createdUser because it takes loggedInUser in user.book
    const createdBooking = bookingRequest.body

    expect(createdBooking.totalPrice).toBe(2500)
    expect(createdBooking.status).toBe('Upcoming')
  })
})
