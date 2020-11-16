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

const donatersCreate = asyncHandler(async (req, res, next) => {

  const newDonater = {
    name: req.body.name,
    email: req.body.email,
    paymentMethod: req.body.paymentMethod,
    nameOnCard: req.body.nameOnCard,
    cardNumber: parseInt(req.body.cardNumber),
    securityNumber: parseInt(req.body.securityNumber),
    expirationDate: req.body.expirationDate,
    donationAmount: parseInt(req.body.donationAmount),
    donationMethod: req.body.donationMethod,
    donationPeriod: parseInt(req.body.donationPeriod),
    donationStartDate: req.body.donationStartDate
  }

  // INVALID IF...
  if (req.body.securityNumber.length > 3 || req.body.securityNumber.length < 0) {
    return next(new ErrorResponse('Invalid Security Number', 400))
  }

  const createdDonater = await Donater.create(newDonater)

  res.status(201).json(createdDonater)
  
})

const donatersSingle = asyncHandler(async (req, res, next) => {
  //* this id is the object id
  //* whatever goes into /:id is referred to as the req.params.id
  const donaterId = req.params.id
  //* if there's a valid mongo id but it's not a 'currently valid' one it will still error now
  const donater = await Donater.findById(donaterId)
  if (!donater) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donater)
})


module.exports = {
  index: donatersIndex,
  create: donatersCreate,
  single: donatersSingle
}