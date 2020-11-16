const ErrorResponse = require('../middleware/errorResponse')
const Donater = require('../models/donater')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')

const donatersIndex = asyncHandler(async (req, res, next) => {
  const donaters = await Donater.find()

  if (!donaters) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donaters)
})


module.exports = {
  index: donatersIndex
}