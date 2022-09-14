const request = require('supertest')
const app = require('../src/app')

describe('Bungalows endpoints', () => {
  // To use this test, first need to change res.render to res.send in bungalows.js line:28-29

  it('get request to /bungalows should list bungalows', async () => {
    const bungalowList = (await request(app).get('/bungalows')).body

    const bungalowsExist = bungalowList.length > 0

    expect(bungalowsExist).toBe(true)
  })

  // #it#('get request to /bungalows should list bungalows', async () => {
  //   const response = await request(app).get('/bungalows')

  //   expect(response.status).toBe(200)
  // })

  it('get request to /bungalows/:bungalowId should return bungalow', async () => {
    // create bungalow
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'somewhere',
      capacity: 4,
      price: 1250,
    }

    const bungalowResponse = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowResponse.body
    // find bungalow id by searching it's name

    const response = await request(app).get(`/bungalows/${createdBungalow.id}`).expect(200)

    expect(response.body).toMatchObject(bungalowToCreate)
  })

  it('post request to /bungalows should create a bungalow', async () => {
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'edirne',
      capacity: 4,
      price: 1250,
    }

    const bungalowResponse = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowResponse.body

    expect(createdBungalow).toMatchObject(bungalowToCreate)
    // expect(createdBungalow.name).toBe(bungalowToCreate.name)
    // expect(createdBungalow.location).toBe(bungalowToCreate.location)
    // expect(createdBungalow.capacity).toBe(bungalowToCreate.capacity)
    // expect(createdBungalow.price).toBe(bungalowToCreate.price)
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

    const bungalowResponse = await request(app).post('/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowResponse.body
    console.log('====bungalow===', createdBungalow)

    const reviewResponse = await request(app).post(`/bungalows/${createdBungalow.id}/reviews`).send(reviewToCreate)
    const createdReview = reviewResponse.body
    console.log('====review===', createdReview)

    expect(createdReview).toMatchObject(reviewToCreate)
  })
})
