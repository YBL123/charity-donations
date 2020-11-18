const ErrorResponse = require('../middleware/errorResponse')
const Period = require('../models/donationPeriod')
const Donation = require('../models/donation')
const moment = require('moment')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')


const periodsIndex = asyncHandler(async (req, res, next) => {
  const periods = await Period.find()

  if (!periods) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(periods)
})

const createPeriod = asyncHandler(async (req, res, next) => {
  const dateNow = moment()

  // PREPPING PERIOD OBJECT FOR CREATION
  const period = {
    donor_id: req.body.donor_id,
    donation_details: req.body.donation_details
  }

  // IF START DATE IS SENT IN A VALID FORMAT. 
  if (period.donation_details.donation_start_date && !moment(period.donation_details.donation_start_date, 'YYYY-MM-DD', true).isValid()) {
    return next(new ErrorResponse('Invalid Start Date', 400))
  }
  // DATE MUST BE NOW OR IN THE FUTURE
  if (moment(period.donation_details.start_date, 'YYYY-MM-DD') < dateNow) {
    return next(new ErrorResponse('Invalid Start Date', 400))
  }

  
  period.donation_details.amount = parseFloat(period.donation_details.amount)
  if (req.body.period !== undefined) {
    period.donation_details.period = parseInt(period.donation_details.period)
  }
  


  // CREATE NEW PERIOD
  console.log(period)
  const newPeriod = await Period.create(period)

  res.status(201).json(newPeriod)
})

const singlePeriod = asyncHandler(async (req, res, next) => {
  //* this id is the object id
  //* whatever goes into /:id is referred to as the req.params.id
  const periodId = req.params.id
  //* if there's a valid mongo id but it's not a 'currently valid' one it will still error now
  const period = await Period.findById(periodId)
  if (!period) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(period)
})


module.exports = {
  index: periodsIndex,
  create: createPeriod,
  single: singlePeriod
}