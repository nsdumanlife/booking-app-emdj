/* eslint-disable no-underscore-dangle */
const request = require('supertest')
const app = require('../src/app')

describe('Bungalows endpoints', () => {
  it('get request to /bungalows should list bungalows', async () => {
    const bungalowList = (await request(app).get('/bungalows')).body

    const bungalowsExist = bungalowList.length > 0

    expect(bungalowsExist).toBe(true)
  })

  it('get request to /bungalows/:bungalowId should return bungalow', async () => {
    // create bungalow
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'somewhere',
      capacity: 4,
      price: 1250,
    }

    const bungalowRequest = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const response = await request(app).get(`/bungalows/${createdBungalow._id}`).expect(200)

    expect(response.body).toMatchObject(bungalowToCreate)
  })

  it('post request to /bungalows should create a bungalow', async () => {
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'edirne',
      capacity: 4,
      price: 1250,
    }

    const bungalowRequest = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    expect(createdBungalow).toMatchObject(bungalowToCreate)
    expect(createdBungalow.name).toBe(bungalowToCreate.name)
    expect(createdBungalow.location).toBe(bungalowToCreate.location)
    expect(createdBungalow.capacity).toBe(bungalowToCreate.capacity)
    expect(createdBungalow.price).toBe(bungalowToCreate.price)
  })

  it('create a new review', async () => {
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'somewhere',
      capacity: 4,
      price: 1250,
    }

    const reviewToCreate = {
      text: 'perfect place',
      rate: 3,
    }

    const bungalowRequest = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const reviewRequest = await request(app).post(`/bungalows/${createdBungalow._id}/reviews`).send(reviewToCreate)
    const createdReview = reviewRequest.body

    expect(createdReview).toMatchObject(reviewToCreate)
  })
})
