function dateIsValid(date) {
  return date instanceof Date && !Number.isNaN(date)
}

module.exports = function getDuration(startDate, endDate) {
  if (!dateIsValid(startDate) || !dateIsValid(endDate)) throw new TypeError()
  if (endDate - startDate < 0) throw new Error('Dates are invalid.')

  const timeInMillisecs = endDate - startDate
  // convert milliseconds to days
  const timeInDays = Math.ceil(timeInMillisecs / (1000 * 60 * 60 * 24))

  return timeInDays
}
