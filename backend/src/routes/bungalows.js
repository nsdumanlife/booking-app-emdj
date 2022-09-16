const express = require('express')
const Bungalow = require('../models/bungalow')
const getLoggedInUser = require('../models/index')

const router = express.Router()

/* GET bungalows listing. */
router.get('/', async (req, res, next) => {
  try {
    const bungalows = await Bungalow.find({})

    if (!bungalows)
      return res.render('error', {
        error: { status: 404 },
        message: `No bungalow found`,
      })

    const user = await getLoggedInUser()

    if (req.query.name) {
      const bungalow = await Bungalow.findOne({
        name: `${req.query.name.toLowerCase()}`,
      })
      return res.send(bungalow)
      // return res.redirect(`/bungalows/${bungalow.id}`)
    }

    return res.send(bungalows)
    // return res.render('bungalows', { title: `Rent a Bungalow for Your Next Escape`, bungalows, user })
  } catch (e) {
    return next(e)
  }
})
/* GET bungalow detail page. */
router.get('/:bungalowId', async (req, res, next) => {
  try {
    const bungalow = await Bungalow.findById(req.params.bungalowId)

    if (bungalow) return res.send(bungalow)
    // if (bungalow)
    //   res.render('bungalow', {
    //     title: `Bungalow ${bungalow.name[0].toUpperCase() + bungalow.name.substring(1)}`,
    //     bungalow,
    //   })
    return res.sendStatus(404)
  } catch (e) {
    return next(e)
  }
})

/* POST/create new review. */
router.post('/:bungalowId/reviews', async (req, res, next) => {
  try {
    const bungalow = await Bungalow.findById(req.params.bungalowId)

    if (!bungalow)
      return res.render('error', {
        error: { status: 404 },
        message: `No bungalow found`,
      })

    const user = await getLoggedInUser()
    const review = await user.review(bungalow, req.body.text, req.body.rate)
    return res.send(review)
    // return res.redirect(`/bungalows/${bungalow.id}`)
  } catch (e) {
    return next(e)
  }
})
/* POST/create new bungalow */
router.post('/', async (req, res, next) => {
  try {
    const user = await getLoggedInUser()

    const bungalow = await user.createBungalow(
      req.body.name.toLowerCase(),
      req.body.location.toLowerCase(),
      req.body.capacity,
      req.body.price
    )
    return res.send(bungalow)
    // return res.redirect(`/bungalows/${bungalow.id}`)
  } catch (e) {
    return next(e)
  }
})

module.exports = router
