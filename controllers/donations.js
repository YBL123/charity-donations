const ErrorResponse = require('../middleware/errorResponse')
const Donation = require('../models/donation')
const Donor = require('../models/donor')
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


//GET ALL DONATIONS FOR SINGLE DONOR
const getDonorDonations = asyncHandler(async (req, res, next) => {

  const donorId = req.params.id

  if (!donorId) {
    return next(new ErrorResponse(notFound, 404))
  }
  const donor = await Donor.findById(donorId)
  if (!donor) {
    return next(new ErrorResponse(notFound, 404))
  }

  const donations = await Donation.find({ donor_id: donorId })
  if (donations.length === 0) {
    return next(new ErrorResponse('no donations have been made', 404))
  }

  const organisedDonations = await organiseDonationsByPeriod(donations)

  console.log(organisedDonations)
  
  res.status(200).json(organisedDonations)
})


const organiseDonationsByPeriod = (donations) => {
  let periodsArray = []
  let donationsCopy = [...donations]

  while (donationsCopy.length !== 0) {
    // FILTERING ARRAY AND RETURNING THE FIRST PERIOD
    const result = donationsCopy.filter(don => don.donation_period_id === donationsCopy[0].donation_period_id)
    periodsArray.push(result)
    donationsCopy = donationsCopy.filter(don => don.donation_period_id !== donationsCopy[0].donation_period_id)
  }
  return periodsArray
}


module.exports = {
  index: donationsIndex,
  single: singleDonation,
  donorDonations: getDonorDonations
}