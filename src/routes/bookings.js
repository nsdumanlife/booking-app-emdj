const express = require('express')
const Booking = require('../models/booking')
const Bungalow = require('../models/bungalow')
const getLoggedInUser = require('../models/index')

const router = express.Router()

/* GET bookings listing. */
router.get('/', async (req, res, next) => {
  try {
    const user = await getLoggedInUser()

    return res.render('bookings', { title: 'Bookings', user, loggedIn: true })
  } catch (e) {
    return next(e)
  }
})
/* POST/create new booking. */
router.post('/', async (req, res, next) => {
  try {
    const bungalow = await Bungalow.findById(req.body.bungalowId)

    if (!bungalow)
      return res.render('error', {
        error: { status: 404 },
        message: `No bungalow found`,
      })

    const user = await getLoggedInUser()
    const booking = await user.book(bungalow, new Date(req.body.checkInDate), new Date(req.body.checkOutDate))

    return res.send(booking)
  } catch (e) {
    return next(e)
  }
})

router.delete('/:bookingId', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
    const user = await getLoggedInUser()

    if (!booking)
      return res.render('error', {
        error: { status: 404 },
        message: `Booking can not found`,
      })

    await user.cancelBooking(booking)

    return res.redirect('/bookings')
  } catch (e) {
    return next(e)
  }
})

module.exports = router
