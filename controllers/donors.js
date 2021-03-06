const ErrorResponse = require('../middleware/errorResponse')
const moment = require('moment')
const Donor = require('../models/donor')
const Period = require('../models/donationPeriod')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')

const donorsIndex = asyncHandler(async (req, res, next) => {
  const donors = await Donor.find()

  if (!donors) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donors)
})

const createDonor = asyncHandler(async (req, res, next) => {

  // SPREAD -> COPYING DATA OF REQ.BODY AND STORING IN donor VARIABLE
  const donor = { ...req.body }
  const dateNow = moment()

  // INVALID IF..
  if (!donor.payment_method.security_number || donor.payment_method.security_number.length > 3 || donor.payment_method.security_number.length < 0) {
    return next(new ErrorResponse('Invalid Security Number', 400))
  }
  // IF START DATE IS SENT IN A VALID FORMAT. 
  if (donor.donation_details.donation_start_date && !moment(donor.donation_details.donation_start_date, 'YYYY-MM-DD', true).isValid()) {
    return next(new ErrorResponse('Invalid Start Date', 400))
  }
  // DATE MUST BE NOW OR IN THE FUTURE
  if (moment(donor.donation_details.start_date, 'YYYY-MM-DD') < dateNow) {
    return next(new ErrorResponse('Invalid Start Date', 400))
  }

  // CHANGES card_date TO ['MM', 'YY'] 
  const cardDate = donor.payment_method.expiration_date.split('/')
  if (cardDate[1] < moment().format('YY')) {
    return next(new ErrorResponse('Invalid card exp date', 400))
  }

  // prep DONOR OBJECT FOR CREATION
  donor.payment_method.card_number = parseInt(donor.payment_method.card_number)
  donor.payment_method.security_number = parseInt(donor.payment_method.security_number)
  donor.donation_details.amount = parseFloat(donor.donation_details.amount)
  donor.donation_details.donation_period = parseInt(donor.donation_details.donation_period)

  // PREPPING PERIOD OBJECT FOR CREATION
  const period = {
    donor_id: '',
    donation_details: donor.donation_details
  }
  // DELETING donation_details FROM DONOR OBJECT BECAUSE IT IS NOW STORED ON THE PERIOD OBJECT
  delete donor.donation_details

  //CREATE NEW DONOR
  const newDonor = await Donor.create(donor)

  // NOW THAT WE HAVE THE NEW donor_id WE CAN ADD IT TO NEW PERIOD OBJECT
  period.donor_id = newDonor._id

  // DEPENDENCY -> ONE SERVICE DEPENDING ON THE OTHER -> CREATION OF DONOR WILL ALSO CREATE A PERIOD
  // CREATE NEW PERIOD
  const newPeriod = await Period.create(period)

  
  res.status(201).json({ newDonor: newDonor, newPeriod: newPeriod })

})

const singleDonor = asyncHandler(async (req, res, next) => {
  //* this id is the object id
  //* whatever goes into /:id is referred to as the req.params.id
  const donorId = req.params.id
  //* if there's a valid mongo id but it's not a 'currently valid' one it will still error now
  const donor = await Donor.findById(donorId)
  if (!donor) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donor)
})


module.exports = {
  index: donorsIndex,
  create: createDonor,
  single: singleDonor
}