const ErrorResponse = require('../middleware/errorResponse')
const Donation = require('../models/donation')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')

const donationsIndex = asyncHandler(async (req, res, next) => {
  const donations = await Donation.find()

  if (!donations) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donations)
})

const singleDonation = asyncHandler(async (req, res, next) => {
  //* this id is the object id
  //* whatever goes into /:id is referred to as the req.params.id
  const donationId = req.params.id
  //* if there's a valid mongo id but it's not a 'currently valid' one it will still error now
  const donation = await Donation.findById(donationId)
  if (!donation) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donation)
})

const createDonation = asyncHandler(async (req, res, next) => {
  const newDonation = await Donation.create(req.body)

  res.status(200).json(newDonation)
})


module.exports = {
  index: donationsIndex,
  single: singleDonation,
  create: createDonation
}